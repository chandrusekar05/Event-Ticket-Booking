function EventCard({
  event,
  showButton,
  onBook,
  onDelete,
  onEdit,
  admin,
}) {
  return (
    <div className="card event-card">

      <div className="event-card-header">
        <h2>{event.title}</h2>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", justifyContent:"flex-end" }}>
          {event.category && (
            <span
              className="badge"
              style={{
                background: event.category === "Tech"
                  ? "rgba(124,92,252,0.15)"
                  : event.category === "Non-Tech"
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(45,212,168,0.15)",
                color: event.category === "Tech"
                  ? "#7c5cfc"
                  : event.category === "Non-Tech"
                  ? "#f59e0b"
                  : "#2dd4a8",
              }}
            >
              {event.category === "Tech" ? "💻 Tech"
                : event.category === "Non-Tech" ? "🎨 Non-Tech"
                : "🛠️ Workshop"}
            </span>
          )}
        </div>
      </div>

      <p className="event-description">{event.description}</p>

      <div className="event-details">
        <div className="info-row">
          <span className="info-label">Date</span>
          <span className="info-value">{event.date ? event.date.split("T")[0] : "—"}</span>
        </div>
        {event.time && (
          <div className="info-row">
            <span className="info-label">Time</span>
            <span className="info-value">{event.time}</span>
          </div>
        )}
        <div className="info-row">
          <span className="info-label">Venue</span>
          <span className="info-value">{event.venue}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Seats</span>
          <span className="info-value">{event.totalSeats}</span>
        </div>
        {event.fee !== undefined && event.fee !== null && (
          <div className="info-row">
            <span className="info-label">Fee</span>
            <span className="info-value">
              {event.fee === 0 || event.fee === "0" ? "Free" : `₹${event.fee}`}
            </span>
          </div>
        )}
      </div>

      <div className="event-actions">
        {showButton && (
          <button onClick={() => onBook(event.id)}>
            Book Ticket
          </button>
        )}

        {admin && (
          <>
            <button
              className="btn-outline"
              onClick={() => onEdit(event)}
            >
              ✏️ Edit
            </button>
            <button
              className="btn-danger"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>

      <style>{`
        .event-card {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .event-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .event-card-header h2 {
          margin-bottom: 0;
        }

        .event-description {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .event-details {
          background: var(--bg-input);
          border-radius: var(--radius-sm);
          padding: 4px 16px;
          margin-bottom: 20px;
        }

        .event-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .event-actions button {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default EventCard;