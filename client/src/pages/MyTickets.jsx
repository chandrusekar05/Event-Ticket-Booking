import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewTicket, setViewTicket] = useState(null); // currently open ticket modal

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/bookings/my-bookings", {
        headers: { authorization: token },
      });
      setTickets(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers ──
  const formatDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  };

  // ── PDF Download using print ──
  const downloadPDF = (ticket) => {
    const printWindow = window.open("", "_blank");
    const dateStr = formatDate(ticket.date);
    const timeStr = formatTime(ticket.time);
    const feeStr = ticket.fee
      ? (ticket.fee === 0 || ticket.fee === "0" ? "Free" : `₹${ticket.fee}`)
      : "Free";
    const attendedStr = ticket.attended ? "✅ Present" : "⏳ Pending";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ticket - ${ticket.ticketId}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body {
            font-family: 'Segoe UI', sans-serif;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 40px;
          }
          .ticket {
            width: 540px;
            border: 2px solid #7c5cfc;
            border-radius: 20px;
            overflow: hidden;
          }
          .ticket-top {
            background: linear-gradient(135deg, #7c5cfc, #a78bfa);
            padding: 32px 36px;
            color: #fff;
          }
          .ticket-logo {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            opacity: 0.8;
            margin-bottom: 12px;
          }
          .ticket-title {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .ticket-id-display {
            font-size: 13px;
            opacity: 0.75;
            font-family: monospace;
          }
          .ticket-divider {
            display: flex;
            align-items: center;
            position: relative;
          }
          .ticket-divider::before,
          .ticket-divider::after {
            content: '';
            flex: 1;
            height: 2px;
            background: repeating-linear-gradient(
              90deg, #e0e0e0 0, #e0e0e0 6px, transparent 6px, transparent 12px
            );
          }
          .ticket-notch {
            width: 24px;
            height: 24px;
            background: #fff;
            border-radius: 50%;
            border: 2px solid #7c5cfc;
            margin: 0 -12px;
            flex-shrink: 0;
          }
          .ticket-body {
            background: #fff;
            padding: 28px 36px 36px;
          }
          .t-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
          }
          .t-row:last-child { border-bottom: none; }
          .t-label {
            font-size: 11px;
            font-weight: 700;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }
          .t-value {
            font-size: 14px;
            font-weight: 600;
            color: #1a1a26;
            text-align: right;
            max-width: 60%;
          }
          .t-value.mono {
            font-family: monospace;
            color: #7c5cfc;
            font-size: 16px;
            letter-spacing: 0.08em;
          }
          .ticket-footer {
            background: #f8f8ff;
            padding: 14px 36px;
            text-align: center;
            font-size: 11px;
            color: #999;
            border-top: 1px dashed #e0e0e0;
          }
          @media print {
            body { padding: 0; background:#fff; }
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="ticket-top">
            <div class="ticket-logo">CampusPass</div>
            <div class="ticket-title">${ticket.title}</div>
            <div class="ticket-id-display">Booking ID: ${ticket.ticketId}</div>
          </div>

          <div class="ticket-divider">
            <div class="ticket-notch"></div>
            <div class="ticket-notch"></div>
          </div>

          <div class="ticket-body">
            <div class="t-row">
              <span class="t-label">Booking ID</span>
              <span class="t-value mono">${ticket.ticketId}</span>
            </div>
            <div class="t-row">
              <span class="t-label">Attendee</span>
              <span class="t-value">${ticket.attendee || "—"}</span>
            </div>
            <div class="t-row">
              <span class="t-label">Date</span>
              <span class="t-value">${dateStr}</span>
            </div>
            <div class="t-row">
              <span class="t-label">Time</span>
              <span class="t-value">${timeStr}</span>
            </div>
            <div class="t-row">
              <span class="t-label">Venue</span>
              <span class="t-value">${ticket.venue || "—"}</span>
            </div>
            <div class="t-row">
              <span class="t-label">Fee</span>
              <span class="t-value">${feeStr}</span>
            </div>
            <div class="t-row">
              <span class="t-label">Attendance</span>
              <span class="t-value">${attendedStr}</span>
            </div>
          </div>

          <div class="ticket-footer">
            This is an official CampusPass ticket. Present this at the event entrance.
          </div>
        </div>
        <script>window.onload = () => { window.print(); window.close(); }<\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>My Tickets</h1>
          <p>View and download your booked event tickets</p>
        </div>

        {loading ? (
          <div className="empty-state"><h3>Loading tickets...</h3></div>
        ) : tickets.length === 0 ? (
          <div className="empty-state">
            <h3>No tickets yet</h3>
            <p>Book an event to see your tickets here</p>
          </div>
        ) : (
          <div className="grid mt-grid">
            {tickets.map((ticket) => (
              <div className="card mt-card" key={ticket.id}>

                <div className="mt-card-top">
                  <span className={`badge ${ticket.attended ? "badge-success" : "badge-accent"}`}>
                    {ticket.attended ? "✅ Attended" : "Registered"}
                  </span>
                  <span className="mt-ticket-id">{ticket.ticketId}</span>
                </div>

                <h2 className="mt-event-title">{ticket.title}</h2>

                <div className="mt-meta">
                  <span className="mt-meta-item">📅 {ticket.date ? ticket.date.split("T")[0] : "—"}</span>
                  {ticket.time && (
                    <span className="mt-meta-item">⏰ {formatTime(ticket.time)}</span>
                  )}
                  <span className="mt-meta-item">📍 {ticket.venue || "—"}</span>
                </div>

                <div className="mt-actions">
                  <button onClick={() => setViewTicket(ticket)}>
                    🎟️ View Ticket
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => downloadPDF(ticket)}
                  >
                    ⬇ Download PDF
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ═══════════ TICKET MODAL ═══════════ */}
      {viewTicket && (
        <div className="modal-overlay" onClick={() => setViewTicket(null)}>
          <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>

            {/* Top strip */}
            <div className="ticket-header">
              <div className="ticket-logo-badge">CampusPass 🎓</div>
              <h2 className="ticket-event-name">{viewTicket.title}</h2>
              <div className="ticket-booking-id">{viewTicket.ticketId}</div>
            </div>

            {/* Perforated divider */}
            <div className="ticket-perforation">
              <div className="perf-circle left" />
              <div className="perf-dashes" />
              <div className="perf-circle right" />
            </div>

            {/* Details section */}
            <div className="ticket-body">
              <div className="ticket-row">
                <div className="ticket-field">
                  <span className="tf-label">Booking ID</span>
                  <span className="tf-value tf-mono">{viewTicket.ticketId}</span>
                </div>
              </div>
              <div className="ticket-row">
                <div className="ticket-field">
                  <span className="tf-label">Attendee</span>
                  <span className="tf-value">{viewTicket.attendee || "—"}</span>
                </div>
              </div>
              <div className="ticket-row two-col">
                <div className="ticket-field">
                  <span className="tf-label">Date</span>
                  <span className="tf-value">
                    {formatDate(viewTicket.date)}
                  </span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">Time</span>
                  <span className="tf-value">{formatTime(viewTicket.time)}</span>
                </div>
              </div>
              <div className="ticket-row">
                <div className="ticket-field">
                  <span className="tf-label">Venue</span>
                  <span className="tf-value">{viewTicket.venue || "—"}</span>
                </div>
              </div>
              <div className="ticket-row two-col">
                <div className="ticket-field">
                  <span className="tf-label">Fee</span>
                  <span className="tf-value">
                    {viewTicket.fee
                      ? (viewTicket.fee === 0 || viewTicket.fee === "0"
                        ? "Free"
                        : `₹${viewTicket.fee}`)
                      : "Free"}
                  </span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">Attendance</span>
                  <span className={`tf-value ${viewTicket.attended ? "tf-success" : "tf-pending"}`}>
                    {viewTicket.attended ? "✅ Present" : "⏳ Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="ticket-footer">
              <button onClick={() => downloadPDF(viewTicket)}>
                ⬇ Download PDF
              </button>
              <button className="btn-outline" onClick={() => setViewTicket(null)}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        /* ── List cards ── */
        .mt-grid { padding-bottom: 60px; }

        .mt-card {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mt-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .mt-ticket-id {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .mt-event-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .mt-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .mt-meta-item {
          font-size: 13px;
          color: var(--text-secondary);
          background: var(--bg-input);
          padding: 5px 12px;
          border-radius: 100px;
        }

        .mt-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .mt-actions button { flex: 1; font-size: 13px; padding: 10px; }

        /* ── Modal overlay ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }

        /* ── Ticket modal ── */
        .ticket-modal {
          width: 100%;
          max-width: 440px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,92,252,0.3);
          animation: fadeInUp 0.35s ease;
        }

        /* Top purple header */
        .ticket-header {
          background: linear-gradient(135deg, #7c5cfc 0%, #a78bfa 100%);
          padding: 32px 32px 28px;
          text-align: center;
          color: #fff;
        }

        .ticket-logo-badge {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.8;
          margin-bottom: 14px;
        }

        .ticket-event-name {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .ticket-booking-id {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          opacity: 0.75;
          letter-spacing: 0.1em;
        }

        /* Perforated divider */
        .ticket-perforation {
          display: flex;
          align-items: center;
          background: #12121a;
          position: relative;
        }

        .perf-circle {
          width: 24px;
          height: 24px;
          background: #0a0a0f;
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .perf-circle.left  { margin-left: -12px; }
        .perf-circle.right { margin-right: -12px; }

        .perf-dashes {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            rgba(124,92,252,0.4) 0,
            rgba(124,92,252,0.4) 8px,
            transparent 8px,
            transparent 16px
          );
        }

        /* Ticket body */
        .ticket-body {
          background: #1a1a26;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ticket-row {
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ticket-row:last-child { border-bottom: none; }

        .ticket-row.two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ticket-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tf-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .tf-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .tf-mono {
          font-family: 'Courier New', monospace;
          color: var(--accent);
          font-size: 15px;
          letter-spacing: 0.06em;
        }

        .tf-success { color: var(--success); }
        .tf-pending { color: var(--text-secondary); }

        /* Ticket footer */
        .ticket-footer {
          background: #12121a;
          padding: 20px 28px;
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ticket-footer button { flex: 1; font-size: 13px; padding: 12px; }
      `}</style>
    </>
  );
}

export default MyTickets;