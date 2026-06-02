import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function CreateEvent() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    totalSeats: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/events/create",
        formData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      setSuccess("Event created successfully");

      setFormData({
        title: "",
        description: "",
        date: "",
        venue: "",
        totalSeats: "",
      });

    } catch (error) {
      setError(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="create-event-wrapper">
          <div className="create-event-card">

            <div className="create-event-header">
              <h1>Create Event</h1>
              <p>Fill in the details to create a new campus event</p>
            </div>

            {error && (
              <div className="form-message form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-message form-success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="create-form">

              <div className="form-group">
                <label htmlFor="event-title">Event Title</label>
                <input
                  id="event-title"
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="event-description">Description</label>
                <textarea
                  id="event-description"
                  name="description"
                  placeholder="Describe the event"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="event-date">Date</label>
                  <input
                    id="event-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="event-venue">Venue</label>
                  <input
                    id="event-venue"
                    type="text"
                    name="venue"
                    placeholder="Event venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="event-seats">Total Seats</label>
                <input
                  id="event-seats"
                  type="number"
                  name="totalSeats"
                  placeholder="Number of available seats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Event"}
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => navigate("/admin")}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>

      <style>{`
        .create-event-wrapper {
          display: flex;
          justify-content: center;
          padding: 40px 0 60px;
        }

        .create-event-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 44px 40px;
          width: 100%;
          max-width: 560px;
          animation: fadeInUp 0.5s ease;
        }

        .create-event-header {
          margin-bottom: 32px;
        }

        .create-event-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .create-event-header p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .form-message {
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .form-error {
          background: var(--danger-light);
          color: var(--danger);
          border: 1px solid rgba(232, 64, 87, 0.2);
        }

        .form-success {
          background: var(--success-light);
          color: var(--success);
          border: 1px solid rgba(45, 212, 168, 0.2);
        }

        .create-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .form-actions button {
          flex: 1;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
        }

        .form-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 600px) {
          .create-event-card {
            padding: 32px 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default CreateEvent;