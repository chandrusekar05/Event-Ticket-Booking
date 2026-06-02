import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

function ManageEvents() {

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


  // DELETE EVENT
  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/events/delete/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Event Deleted");

      fetchEvents();

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>Manage Events</h1>
          <p>View, edit, and delete campus events</p>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading events...</h3>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <h3>No events found</h3>
            <p>Create your first event to get started</p>
          </div>
        ) : (
          <div className="grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                admin={true}
                onDelete={deleteEvent}
              />
            ))}
          </div>
        )}

      </div>
    </>
  );
}

export default ManageEvents;