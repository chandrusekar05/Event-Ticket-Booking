const express = require("express");

const router = express.Router();

const {
  bookEvent,
  myBookings,
  allBookings,
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

module.exports = router;