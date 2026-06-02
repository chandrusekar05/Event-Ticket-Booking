import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

const CATEGORIES = ["All", "Tech", "Non-Tech", "Workshop"];

// Category color config
const CAT_CONFIG = {
  Tech:       { color: "#7c5cfc", bg: "rgba(124,92,252,0.12)",  icon: "💻" },
  "Non-Tech": { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", icon: "🎨" },
  Workshop:   { color: "#2dd4a8", bg: "rgba(45,212,168,0.12)", icon: "🛠️" },
};

// ── Mini ticket modal shown right after booking ────────────────────
function BookingSuccessModal({ ticket, onClose }) {
  if (!ticket) return null;

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
  };
  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":");
    const hour = parseInt(h, 10);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };
  const feeStr = !ticket.fee || ticket.fee === 0 || ticket.fee === "0" ? "Free" : `₹${ticket.fee}`;

  return (
    <div className="bsm-overlay" onClick={onClose}>
      <div className="bsm-box" onClick={(e) => e.stopPropagation()}>

        {/* Confetti strip */}
        <div className="bsm-top">
          <div className="bsm-check">🎉</div>
          <h2 className="bsm-title">Ticket Booked!</h2>
          <p className="bsm-sub">{ticket.title}</p>
          <div className="bsm-id">{ticket.ticketId}</div>
        </div>

        {/* Perforation */}
        <div className="bsm-perf">
          <div className="bsm-notch left" />
          <div className="bsm-dashes" />
          <div className="bsm-notch right" />
        </div>

        {/* Details */}
        <div className="bsm-body">
          <div className="bsm-row">
            <span className="bsm-label">Attendee</span>
            <span className="bsm-value">{ticket.attendee || "—"}</span>
          </div>
          <div className="bsm-row two">
            <div>
              <span className="bsm-label">Date</span>
              <span className="bsm-value">{formatDate(ticket.date)}</span>
            </div>
            <div>
              <span className="bsm-label">Time</span>
              <span className="bsm-value">{formatTime(ticket.time)}</span>
            </div>
          </div>
          <div className="bsm-row">
            <span className="bsm-label">Venue</span>
            <span className="bsm-value">{ticket.venue || "—"}</span>
          </div>
          <div className="bsm-row two">
            <div>
              <span className="bsm-label">Fee</span>
              <span className="bsm-value">{feeStr}</span>
            </div>
            <div>
              <span className="bsm-label">Category</span>
              <span className="bsm-value">{ticket.category || "—"}</span>
            </div>
          </div>
        </div>

        <div className="bsm-footer">
          <p className="bsm-hint">Find this in <strong>My Tickets</strong> anytime</p>
          <button onClick={onClose}>Done ✓</button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [bookedTicket, setBookedTicket] = useState(null); // shows modal

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

  const bookEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/api/bookings/book",
        { eventId },
        { headers: { authorization: token } }
      );

      // Show ticket modal right away
      if (res.data.ticket) {
        setBookedTicket(res.data.ticket);
      } else {
        alert("Ticket Booked!\nTicket ID: " + res.data.ticketId);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed.");
    }
  };

  // Filter by tab
  const filtered =
    activeTab === "All"
      ? events
      : events.filter((e) => e.category === activeTab);

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>Available Events</h1>
          <p>Browse and book tickets for upcoming campus events</p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="cat-tabs">
          {CATEGORIES.map((cat) => {
            const cfg = CAT_CONFIG[cat];
            const count = cat === "All"
              ? events.length
              : events.filter((e) => e.category === cat).length;
            return (
              <button
                key={cat}
                className={`cat-tab ${activeTab === cat ? "cat-tab-active" : ""}`}
                style={activeTab === cat && cfg
                  ? { color: cfg.color, background: cfg.bg, borderColor: cfg.color }
                  : {}}
                onClick={() => setActiveTab(cat)}
              >
                {cfg ? cfg.icon + " " : "🗓️ "}{cat}
                <span className="cat-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Events Grid ── */}
        {loading ? (
          <div className="empty-state"><h3>Loading events...</h3></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No {activeTab === "All" ? "" : activeTab + " "}events available</h3>
            <p>Check back later for upcoming campus events</p>
          </div>
        ) : (
          <div className="grid sd-grid">
            {filtered.map((event) => (
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

      {/* ── Booking Success Modal ── */}
      <BookingSuccessModal
        ticket={bookedTicket}
        onClose={() => setBookedTicket(null)}
      />

      <style>{`
        /* ── Category tabs ── */
        .cat-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .cat-tab {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          font-size: 13.5px;
          font-weight: 500;
          background: var(--bg-card);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 100px;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .cat-tab:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          transform: translateY(-1px);
          box-shadow: none;
        }

        .cat-tab-active {
          font-weight: 600;
          transform: translateY(-1px);
        }

        .cat-count {
          background: rgba(255,255,255,0.1);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          padding: 1px 7px;
          min-width: 22px;
          text-align: center;
        }

        .sd-grid { padding-bottom: 60px; }

        /* ── Booking success modal ── */
        .bsm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }

        .bsm-box {
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,92,252,0.3);
          animation: fadeInUp 0.35s ease;
        }

        /* Ticket top strip */
        .bsm-top {
          background: linear-gradient(135deg, #7c5cfc 0%, #a78bfa 100%);
          padding: 28px 28px 24px;
          text-align: center;
          color: #fff;
        }

        .bsm-check {
          font-size: 40px;
          margin-bottom: 10px;
          animation: popIn 0.4s ease;
        }

        @keyframes popIn {
          0%   { transform: scale(0.5); opacity: 0; }
          80%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }

        .bsm-title {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .bsm-sub {
          font-size: 14px;
          opacity: 0.85;
          margin-bottom: 10px !important;
        }

        .bsm-id {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.12em;
          background: rgba(255,255,255,0.15);
          display: inline-block;
          padding: 4px 14px;
          border-radius: 100px;
        }

        /* Perforated divider */
        .bsm-perf {
          display: flex;
          align-items: center;
          background: #12121a;
        }
        .bsm-notch {
          width: 22px;
          height: 22px;
          background: #0a0a0f;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .bsm-notch.left  { margin-left: -11px; }
        .bsm-notch.right { margin-right: -11px; }
        .bsm-dashes {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(
            90deg, rgba(124,92,252,0.4) 0, rgba(124,92,252,0.4) 8px,
            transparent 8px, transparent 16px
          );
        }

        /* Body */
        .bsm-body {
          background: #1a1a26;
          padding: 18px 24px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bsm-row {
          display: flex;
          flex-direction: column;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .bsm-row:last-child { border-bottom: none; }

        .bsm-row.two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          flex-direction: unset;
        }

        .bsm-row.two > div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .bsm-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
        }

        .bsm-value {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Footer */
        .bsm-footer {
          background: #12121a;
          padding: 16px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .bsm-hint {
          font-size: 12px;
          color: var(--text-muted);
          flex: 1;
        }

        .bsm-footer button {
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}

export default StudentDashboard;