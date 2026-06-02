import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

function StudentDashboard() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/events"
      );
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const bookEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/bookings/book",
        {
          eventId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert(
        "Ticket Booked\nTicket ID: " +
        res.data.ticketId
      );

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>Available Events</h1>
          <p>Browse and book tickets for upcoming campus events</p>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading events...</h3>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <h3>No events available</h3>
            <p>Check back later for upcoming campus events</p>
          </div>
        ) : (
          <div className="grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                showButton={true}
                onBook={bookEvent}
              />
            ))}
          </div>
        )}

      </div>
    </>
  );
}

export default StudentDashboard;