const db = require("../config/db");

const VALID_CATEGORIES = ["Tech", "Non-Tech", "Workshop"];


// ================= ADD EVENT =================

exports.createEvent = (req, res) => {
  try {
    const { title, description, date, time, venue, totalSeats, fee, category } = req.body;

    const cat = VALID_CATEGORIES.includes(category) ? category : "Tech";

    const query =
      "INSERT INTO events(title,description,date,time,venue,totalSeats,fee,category) VALUES(?,?,?,?,?,?,?,?)";

    db.query(
      query,
      [title, description, date, time || null, venue, totalSeats, fee || 0, cat],
      (err) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
          success: true,
          message: "Event created successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= GET EVENTS =================

exports.getEvents = (req, res) => {
  try {
    const query = "SELECT * FROM events ORDER BY date ASC";

    db.query(query, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= UPDATE EVENT =================

exports.updateEvent = (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, date, time, venue, totalSeats, fee, category } = req.body;

    const cat = VALID_CATEGORIES.includes(category) ? category : "Tech";

    const query =
      "UPDATE events SET title=?, description=?, date=?, time=?, venue=?, totalSeats=?, fee=?, category=? WHERE id=?";

    db.query(
      query,
      [title, description, date, time || null, venue, totalSeats, fee || 0, cat, id],
      (err) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({
          success: true,
          message: "Event updated successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= DELETE EVENT =================

exports.deleteEvent = (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM events WHERE id=?";

    db.query(query, [id], (err) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};