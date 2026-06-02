import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalAttended: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/bookings/admin/stats", {
        headers: { authorization: token },
      });
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStats(false);
    }
  };

  const quickLinks = [
    {
      title: "Manage Events",
      description: "View, edit, delete and create campus events",
      link: "/manage-events",
      icon: "🗓️",
      tag: "Events",
    },
    {
      title: "All Bookings",
      description: "View all student registrations and ticket IDs",
      link: "/all-bookings",
      icon: "🎟️",
      tag: "Bookings",
    },
    {
      title: "Mark Attendance",
      description: "Verify students by their Booking ID and mark attendance",
      link: "/mark-attendance",
      icon: "✅",
      tag: "Attendance",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="page-header">
          <h1>Overview</h1>
          <p>Welcome back, Admin — here's what's happening on campus</p>
        </div>

        {/* ── Stats Row ── */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">🗓️</div>
            <div className="stat-body">
              <span className="stat-label">Total Events</span>
              <span className="stat-value">
                {loadingStats ? "—" : stats.totalEvents}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-body">
              <span className="stat-label">Registrations</span>
              <span className="stat-value">
                {loadingStats ? "—" : stats.totalRegistrations}
              </span>
            </div>
          </div>

          <div className="stat-card stat-card--success">
            <div className="stat-icon">✅</div>
            <div className="stat-body">
              <span className="stat-label">Attended</span>
              <span className="stat-value stat-value--success">
                {loadingStats ? "—" : stats.totalAttended}
              </span>
            </div>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid admin-grid">
          {quickLinks.map((card, index) => (
            <Link to={card.link} key={index} className="admin-card-link">
              <div className="card admin-card">
                <div className="admin-card-top">
                  <span className="admin-card-icon">{card.icon}</span>
                  <span className="badge badge-accent">{card.tag}</span>
                </div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div className="admin-card-action">
                  <span className="admin-link-text">Open →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        /* ── Stats Row ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        @media (max-width: 700px) {
          .stats-row { grid-template-columns: 1fr; }
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all var(--transition-base);
          animation: fadeInUp 0.5s ease both;
        }

        .stat-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .stat-card--success {
          border-color: rgba(45, 212, 168, 0.2);
        }

        .stat-icon {
          font-size: 32px;
          width: 56px;
          height: 56px;
          background: var(--accent-light);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stat-value--success {
          color: var(--success);
        }

        /* ── Section title ── */
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 20px;
        }

        /* ── Quick Action Cards ── */
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .admin-card-icon {
          font-size: 28px;
          width: 48px;
          height: 48px;
          background: var(--accent-light);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-card h2 {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .admin-card p {
          flex: 1;
          font-size: 14px;
          color: var(--text-secondary);
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
          letter-spacing: 0.06em;
        }
      `}</style>
    </>
  );
}

export default AdminDashboard;