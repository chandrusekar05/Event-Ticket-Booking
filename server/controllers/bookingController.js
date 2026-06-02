const db = require("../config/db");


// ================= BOOK EVENT =================

exports.bookEvent = (req, res) => {
  try {

    const userId = req.user.id;

    const { eventId } = req.body;

    // Check duplicate booking
    const checkQuery =
      "SELECT * FROM bookings WHERE userId=? AND eventId=?";

    db.query(
      checkQuery,
      [userId, eventId],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        if (result.length > 0) {
          return res.status(400).json({
            message: "You already booked this event",
          });
        }

        // Generate Ticket ID
        const ticketId =
          "CP" + Math.floor(Math.random() * 1000000);

        // Insert booking
        const insertQuery =
          "INSERT INTO bookings(userId,eventId,ticketId) VALUES(?,?,?)";

        db.query(
          insertQuery,
          [userId, eventId, ticketId],
          (err) => {
            if (err) return res.status(500).json(err);

            // Fetch full ticket details to return immediately
            const detailQuery = `
              SELECT
                bookings.id,
                bookings.ticketId,
                bookings.bookingDate,
                bookings.attended,
                events.title,
                events.date,
                events.time,
                events.venue,
                events.fee,
                events.category,
                users.name AS attendee
              FROM bookings
              JOIN events ON bookings.eventId = events.id
              JOIN users ON bookings.userId = users.id
              WHERE bookings.ticketId = ?
            `;

            db.query(detailQuery, [ticketId], (err2, rows) => {
              if (err2) {
                return res.status(201).json({
                  success: true,
                  message: "Ticket booked successfully",
                  ticketId,
                });
              }
              res.status(201).json({
                success: true,
                message: "Ticket booked successfully",
                ticketId,
                ticket: rows[0] || null,
              });
            });
          }
        );
      }
    );

  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= MY BOOKINGS =================

exports.myBookings = (req, res) => {

  try {

    const userId = req.user.id;

    const query = `
      SELECT 
        bookings.id,
        bookings.ticketId,
        bookings.bookingDate,
        bookings.attended,
        events.title,
        events.date,
        events.time,
        events.venue,
        events.fee,
        events.category,
        users.name AS attendee
      FROM bookings
      JOIN events ON bookings.eventId = events.id
      JOIN users ON bookings.userId = users.id
      WHERE bookings.userId = ?
      ORDER BY bookings.bookingDate DESC
    `;

    db.query(query, [userId], (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);

    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.allBookings = (req, res) => {

  try {

    const query = `
      SELECT
        bookings.id,
        bookings.ticketId,
        users.name AS studentName,
        users.email,
        events.title
      FROM bookings
      JOIN users
      ON bookings.userId = users.id
      JOIN events
      ON bookings.eventId = events.id
      ORDER BY bookings.bookingDate DESC
    `;

    db.query(query, (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);

    });

  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= MARK ATTENDANCE =================

exports.markAttendance = (req, res) => {
  try {
    const { ticketId } = req.body;

    if (!ticketId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    // Check if booking exists
    const checkQuery = `
      SELECT bookings.id, bookings.attended, bookings.ticketId,
        users.name AS studentName, users.email,
        events.title, events.date, events.venue
      FROM bookings
      JOIN users ON bookings.userId = users.id
      JOIN events ON bookings.eventId = events.id
      WHERE bookings.ticketId = ?
    `;

    db.query(checkQuery, [ticketId], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Invalid Ticket ID. No booking found." });
      }

      const booking = result[0];

      if (booking.attended) {
        return res.status(400).json({
          message: "Attendance already marked for this ticket.",
          booking,
        });
      }

      const updateQuery = "UPDATE bookings SET attended = 1 WHERE ticketId = ?";

      db.query(updateQuery, [ticketId], (err2) => {
        if (err2) return res.status(500).json(err2);

        res.status(200).json({
          success: true,
          message: "Attendance marked successfully!",
          booking: { ...booking, attended: true },
        });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= ADMIN STATS =================

exports.getStats = (req, res) => {
  try {
    const query = `
      SELECT
        (SELECT COUNT(*) FROM events) AS totalEvents,
        (SELECT COUNT(*) FROM bookings) AS totalRegistrations,
        (SELECT COUNT(*) FROM bookings WHERE attended = 1) AS totalAttended
    `;

    db.query(query, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};