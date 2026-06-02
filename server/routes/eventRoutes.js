const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const {
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");


// ================= ADMIN ROUTES =================

// CREATE EVENT
router.post(
  "/create",
  verifyToken,
  isAdmin,
  createEvent
);


// UPDATE EVENT
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  updateEvent
);


// DELETE EVENT
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  deleteEvent
);


// ================= PUBLIC ROUTE =================

// GET EVENTS
router.get("/", getEvents);

module.exports = router;