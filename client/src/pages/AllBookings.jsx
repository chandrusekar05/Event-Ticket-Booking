import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function AllBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);


  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/bookings/admin/bookings",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <div className="page-header-top">
            <div>
              <h1>All Bookings</h1>
              <p>View all student event registrations</p>
            </div>
            {bookings.length > 0 && (
              <span className="badge badge-accent">
                {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading bookings...</h3>
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <p>Student bookings will appear here once events are booked</p>
          </div>
        ) : (
          <div className="grid">
            {bookings.map((booking) => (
              <div className="card booking-card" key={booking.id}>

                <div className="booking-card-header">
                  <h2>{booking.title}</h2>
                  <span className="badge badge-success">Confirmed</span>
                </div>

                <div className="booking-details">
                  <div className="info-row">
                    <span className="info-label">Student</span>
                    <span className="info-value">{booking.studentName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{booking.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Ticket ID</span>
                    <span className="info-value booking-ticket-id">{booking.ticketId}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        .page-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .booking-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
        }

        .booking-card-header h2 {
          margin-bottom: 0;
        }

        .booking-details {
          background: var(--bg-input);
          border-radius: var(--radius-sm);
          padding: 4px 16px;
        }

        .booking-ticket-id {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: var(--accent);
        }
      `}</style>
    </>
  );
}

export default AllBookings;