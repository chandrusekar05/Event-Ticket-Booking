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
          (err, result) => {

            if (err) {
              return res.status(500).json(err);
            }

            res.status(201).json({
              success: true,
              message: "Ticket booked successfully",
              ticketId,
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
        events.title,
        events.date,
        events.venue
      FROM bookings
      JOIN events
      ON bookings.eventId = events.id
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