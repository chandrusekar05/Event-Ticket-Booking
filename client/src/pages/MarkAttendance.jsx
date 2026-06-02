import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function MarkAttendance() {
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { success, message, booking }
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketId.trim()) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/api/bookings/mark-attendance",
        { ticketId: ticketId.trim() },
        { headers: { authorization: token } }
      );
      setResult({ success: true, ...res.data });
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      const booking = err.response?.data?.booking || null;
      setResult({ success: false, message: msg, booking });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTicketId("");
    setResult(null);
    setError("");
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>Mark Attendance</h1>
          <p>Enter the student's Booking ID to verify and mark their attendance</p>
        </div>

        <div className="attend-wrapper">

          {/* ── Search Form ── */}
          <div className="attend-card card">
            <div className="attend-icon">🎟️</div>
            <h2>Verify Booking ID</h2>
            <p className="attend-sub">
              Scan or type the ticket ID shown on the student's ticket
            </p>

            <form onSubmit={handleSubmit} className="attend-form">
              <div className="form-group">
                <label htmlFor="ticket-id-input">Booking ID</label>
                <input
                  id="ticket-id-input"
                  type="text"
                  placeholder="e.g. CP784521"
                  value={ticketId}
                  onChange={(e) => {
                    setTicketId(e.target.value.toUpperCase());
                    setResult(null);
                    setError("");
                  }}
                  required
                  autoFocus
                  className="ticket-input"
                />
              </div>
              <button type="submit" disabled={loading || !ticketId.trim()}>
                {loading ? "Verifying..." : "Verify & Mark Attendance"}
              </button>
            </form>
          </div>

          {/* ── Result Card ── */}
          {result && (
            <div className={`result-card card ${result.success ? "result-success" : "result-error"}`}>

              <div className="result-icon">
                {result.success ? "✅" : "❌"}
              </div>

              <div className="result-status">
                {result.success ? "Attendance Marked!" : "Verification Failed"}
              </div>
              <p className="result-message">{result.message}</p>

              {result.booking && (
                <div className="result-details">
                  <div className="info-row">
                    <span className="info-label">Student</span>
                    <span className="info-value">{result.booking.studentName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{result.booking.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Event</span>
                    <span className="info-value">{result.booking.title}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date</span>
                    <span className="info-value">
                      {result.booking.date
                        ? result.booking.date.split("T")[0]
                        : "—"}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Venue</span>
                    <span className="info-value">{result.booking.venue}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Ticket ID</span>
                    <span className="info-value ticket-mono">{result.booking.ticketId}</span>
                  </div>
                </div>
              )}

              <button className="btn-outline reset-btn" onClick={handleReset}>
                ← Verify Another Ticket
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .attend-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding-bottom: 60px;
        }

        .attend-card {
          width: 100%;
          max-width: 480px;
          text-align: center;
          padding: 44px 36px;
          animation: fadeInUp 0.5s ease;
        }

        .attend-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .attend-card h2 {
          font-size: 22px;
          margin-bottom: 8px;
        }

        .attend-sub {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 28px;
        }

        .attend-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }

        .ticket-input {
          font-family: 'Courier New', monospace;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-align: center;
          color: var(--accent);
        }

        .attend-form button {
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          width: 100%;
        }

        .attend-form button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* ── Result card ── */
        .result-card {
          width: 100%;
          max-width: 480px;
          text-align: center;
          padding: 36px 32px;
          animation: fadeInUp 0.4s ease;
        }

        .result-success {
          border-color: rgba(45, 212, 168, 0.4);
          background: linear-gradient(
            135deg,
            var(--bg-card),
            rgba(45, 212, 168, 0.05)
          );
        }

        .result-error {
          border-color: rgba(232, 64, 87, 0.4);
          background: linear-gradient(
            135deg,
            var(--bg-card),
            rgba(232, 64, 87, 0.05)
          );
        }

        .result-icon {
          font-size: 52px;
          margin-bottom: 12px;
        }

        .result-status {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .result-message {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px !important;
        }

        .result-details {
          background: var(--bg-input);
          border-radius: var(--radius-sm);
          padding: 4px 16px;
          margin-bottom: 24px;
          text-align: left;
        }

        .ticket-mono {
          font-family: 'Courier New', monospace;
          color: var(--accent);
        }

        .reset-btn {
          width: 100%;
          padding: 12px;
        }
      `}</style>
    </>
  );
}

export default MarkAttendance;
