import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function MyTickets() {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);


  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setTickets(res.data);
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
          <h1>My Tickets</h1>
          <p>View all your booked event tickets</p>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading tickets...</h3>
          </div>
        ) : tickets.length === 0 ? (
          <div className="empty-state">
            <h3>No tickets yet</h3>
            <p>Book an event to see your tickets here</p>
          </div>
        ) : (
          <div className="grid">
            {tickets.map((ticket) => (
              <div className="card ticket-card" key={ticket.id}>

                <div className="ticket-card-header">
                  <h2>{ticket.title}</h2>
                  <span className="badge badge-success">Booked</span>
                </div>

                <div className="ticket-details">
                  <div className="info-row">
                    <span className="info-label">Ticket ID</span>
                    <span className="info-value ticket-id">{ticket.ticketId}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date</span>
                    <span className="info-value">{ticket.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Venue</span>
                    <span className="info-value">{ticket.venue}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        .ticket-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
        }

        .ticket-card-header h2 {
          margin-bottom: 0;
        }

        .ticket-details {
          background: var(--bg-input);
          border-radius: var(--radius-sm);
          padding: 4px 16px;
        }

        .ticket-id {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: var(--accent);
        }
      `}</style>
    </>
  );
}

export default MyTickets;