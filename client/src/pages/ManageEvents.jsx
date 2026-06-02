import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

// ── Shared form default ──────────────────────────
const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  totalSeats: "",
  fee: "",
  category: "Tech",
};

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Create / Edit modal state ──
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // null = create mode
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ── Open modal helpers ──
  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setFormSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date ? event.date.split("T")[0] : "",
      time: event.time || "",
      venue: event.venue || "",
      totalSeats: event.totalSeats || "",
      fee: event.fee || "",
      category: event.category || "Tech",
    });
    setFormError("");
    setFormSuccess("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setFormSuccess("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
    setFormSuccess("");
  };

  // ── Submit (create or update) ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (editingEvent) {
        // UPDATE
        await api.put(
          `/api/events/update/${editingEvent.id}`,
          formData,
          { headers: { authorization: token } }
        );
        setFormSuccess("Event updated successfully!");
      } else {
        // CREATE
        await api.post(
          "/api/events/create",
          formData,
          { headers: { authorization: token } }
        );
        setFormSuccess("Event created successfully!");
      }

      fetchEvents();

      // Close after short delay so user sees success
      setTimeout(() => closeModal(), 1200);
    } catch (error) {
      setFormError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setFormLoading(false);
    }
  };

  // ── Delete ──
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/events/delete/${id}`, {
        headers: { authorization: token },
      });
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete event.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header me-page-header">
          <div>
            <h1>Manage Events</h1>
            <p>View, edit, and delete campus events</p>
          </div>
          <button className="btn-new-event" onClick={openCreateModal}>
            + New Event
          </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading events...</h3>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <h3>No events yet</h3>
            <p>Click "+ New Event" to create your first campus event</p>
          </div>
        ) : (
          <div className="grid me-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                admin={true}
                onDelete={deleteEvent}
                onEdit={openEditModal}
              />
            ))}
          </div>
        )}

      </div>

      {/* ═══════════ MODAL ═══════════ */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h2>{editingEvent ? "Edit Event" : "Create New Event"}</h2>
              <button className="modal-close btn-ghost" onClick={closeModal}>✕</button>
            </div>

            {formError && (
              <div className="form-message form-error">{formError}</div>
            )}
            {formSuccess && (
              <div className="form-message form-success">{formSuccess}</div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">

              <div className="form-group">
                <label htmlFor="m-title">Event Title</label>
                <input
                  id="m-title"
                  type="text"
                  name="title"
                  placeholder="e.g. Tech Fest 2025"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="m-description">Description</label>
                <textarea
                  id="m-description"
                  name="description"
                  placeholder="Describe the event..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="m-date">Date</label>
                  <input
                    id="m-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="m-time">Time</label>
                  <input
                    id="m-time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="m-venue">Venue</label>
                <input
                  id="m-venue"
                  type="text"
                  name="venue"
                  placeholder="e.g. Main Auditorium"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="m-seats">Total Seats</label>
                  <input
                    id="m-seats"
                    type="number"
                    name="totalSeats"
                    placeholder="e.g. 200"
                    value={formData.totalSeats}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="m-fee">Fee (₹)</label>
                  <input
                    id="m-fee"
                    type="number"
                    name="fee"
                    placeholder="0 = Free"
                    value={formData.fee}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="m-category">Category</label>
                <select
                  id="m-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Tech">💻 Tech</option>
                  <option value="Non-Tech">🎨 Non-Tech</option>
                  <option value="Workshop">🛠️ Workshop</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" disabled={formLoading}>
                  {formLoading
                    ? editingEvent ? "Saving..." : "Creating..."
                    : editingEvent ? "Save Changes" : "Create Event"}
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <style>{`
        /* ── Page header ── */
        .me-page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }

        .btn-new-event {
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .me-grid {
          padding-bottom: 60px;
        }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }

        .modal-box {
          background: var(--bg-card);
          border: 1px solid var(--border-hover);
          border-radius: var(--radius-xl);
          padding: 36px 32px;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          animation: fadeInUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .modal-header h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 0;
        }

        .modal-close {
          width: 36px;
          height: 36px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 16px;
          flex-shrink: 0;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
          .modal-box { padding: 24px 20px; }
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .modal-actions button {
          flex: 1;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
        }

        .modal-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .form-message {
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-error {
          background: var(--danger-light);
          color: var(--danger);
          border: 1px solid rgba(232,64,87,0.2);
        }

        .form-success {
          background: var(--success-light);
          color: var(--success);
          border: 1px solid rgba(45,212,168,0.2);
        }
      `}</style>
    </>
  );
}

export default ManageEvents;