import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to={user?.role === "admin" ? "/admin" : "/student"} className="navbar-brand">
          <span className="brand-dot">●</span>
          <span className="brand-text">CampusPass</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        <div className={`navbar-links ${mobileOpen ? "navbar-links-open" : ""}`}>

          {user?.role === "student" && (
            <>
              <Link
                to="/student"
                className={`nav-link ${isActive("/student") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Events
              </Link>

              <Link
                to="/my-tickets"
                className={`nav-link ${isActive("/my-tickets") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                My Tickets
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className={`nav-link ${isActive("/admin") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Overview
              </Link>

              <Link
                to="/manage-events"
                className={`nav-link ${isActive("/manage-events") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Manage Events
              </Link>

              <Link
                to="/all-bookings"
                className={`nav-link ${isActive("/all-bookings") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Bookings
              </Link>

              <Link
                to="/mark-attendance"
                className={`nav-link ${isActive("/mark-attendance") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Mark Attendance
              </Link>
            </>
          )}

          <div className="nav-separator"></div>

          {user && (
            <span className="nav-user">
              {user.name}
            </span>
          )}

          <button className="btn-ghost nav-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          background: rgba(10, 10, 15, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-inner {
          max-width: 1200px;
          width: 92%;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-dot {
          color: var(--accent);
          font-size: 10px;
          line-height: 1;
        }

        .brand-text {
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nav-link {
          padding: 7px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link-active {
          color: var(--accent);
          background: var(--accent-light);
        }

        .nav-link-active:hover {
          color: var(--accent);
          background: var(--accent-light);
        }

        .nav-separator {
          width: 1px;
          height: 22px;
          background: var(--border);
          margin: 0 6px;
        }

        .nav-user {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
          padding: 0 8px;
        }

        .nav-logout {
          font-size: 13px;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          padding: 6px 12px;
          font-size: 16px;
          border-radius: var(--radius-sm);
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: none;
          transform: none;
        }

        @media (max-width: 900px) {
          .mobile-toggle {
            display: block;
          }

          .navbar-links {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border);
            flex-direction: column;
            padding: 16px;
            gap: 4px;
            animation: slideDown 0.2s ease;
          }

          .navbar-links-open {
            display: flex;
          }

          .nav-link {
            width: 100%;
            padding: 12px 16px;
          }

          .nav-separator {
            width: 100%;
            height: 1px;
            margin: 8px 0;
          }

          .nav-user {
            padding: 8px 16px;
          }

          .nav-logout {
            width: 100%;
            text-align: left;
            padding: 12px 16px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;