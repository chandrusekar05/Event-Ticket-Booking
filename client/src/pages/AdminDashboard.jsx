import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {

  const cards = [
    {
      title: "Create Events",
      description: "Add new college events with details like venue, date, and available seats",
      link: "/create-event",
      tag: "Action",
    },
    {
      title: "Manage Events",
      description: "Edit, view, and delete existing events from the platform",
      link: "/manage-events",
      tag: "Manage",
    },
    {
      title: "All Bookings",
      description: "View all student bookings, ticket IDs, and registration details",
      link: "/all-bookings",
      tag: "Overview",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your campus events and registrations</p>
        </div>

        <div className="grid admin-grid">
          {cards.map((card, index) => (
            <Link to={card.link} key={index} className="admin-card-link">
              <div className="card admin-card">
                <div className="admin-card-top">
                  <span className="badge badge-accent">{card.tag}</span>
                </div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div className="admin-card-action">
                  <span className="admin-link-text">Open</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        .admin-grid {
          padding-bottom: 60px;
        }

        .admin-card-link {
          display: block;
        }

        .admin-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .admin-card-top {
          margin-bottom: 20px;
        }

        .admin-card h2 {
          font-size: 22px;
          margin-bottom: 10px;
        }

        .admin-card p {
          flex: 1;
        }

        .admin-card-action {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .admin-link-text {
          font-size: 14px;
          font-weight: 500;
          color: var(--accent);
          transition: all var(--transition-fast);
        }

        .admin-card:hover .admin-link-text {
          letter-spacing: 0.03em;
        }
      `}</style>
    </>
  );
}

export default AdminDashboard;