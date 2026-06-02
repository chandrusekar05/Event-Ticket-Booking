const express = require("express");

const router = express.Router();

const {
  bookEvent,
  myBookings,
  allBookings,
  markAttendance,
  getStats,
} = require("../controllers/bookingController");

const {
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");


// BOOK EVENT
router.post(
  "/book",
  verifyToken,
  bookEvent
);


// MY BOOKINGS
router.get(
  "/my-bookings",
  verifyToken,
  myBookings
);


// ADMIN BOOKINGS
router.get(
  "/admin/bookings",
  verifyToken,
  isAdmin,
  allBookings
);


// MARK ATTENDANCE
router.post(
  "/mark-attendance",
  verifyToken,
  isAdmin,
  markAttendance
);


// ADMIN STATS
router.get(
  "/admin/stats",
  verifyToken,
  isAdmin,
  getStats
);


module.exports = router;