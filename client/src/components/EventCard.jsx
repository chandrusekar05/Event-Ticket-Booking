function EventCard({
  event,
  showButton,
  onBook,
  onDelete,
  admin,
}) {
  return (
    <div className="card event-card">

      <div className="event-card-header">
        <h2>{event.title}</h2>
        <span className="badge badge-accent">Event</span>
      </div>

      <p className="event-description">{event.description}</p>

      <div className="event-details">
        <div className="info-row">
          <span className="info-label">Date</span>
          <span className="info-value">{event.date}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Venue</span>
          <span className="info-value">{event.venue}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Seats</span>
          <span className="info-value">{event.totalSeats}</span>
        </div>
      </div>

      <div className="event-actions">
        {showButton && (
          <button onClick={() => onBook(event.id)}>
            Book Ticket
          </button>
        )}

        {admin && (
          <button
            className="btn-danger"
            onClick={() => onDelete(event.id)}
          >
            Delete
          </button>
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