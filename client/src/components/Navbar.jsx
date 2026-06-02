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
          <span className="brand-text">CampusPass</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close" : "Menu"}
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
                Dashboard
              </Link>

              <Link
                to="/create-event"
                className={`nav-link ${isActive("/create-event") ? "nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Create Event
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
          background: rgba(10, 10, 15, 0.85);
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
          gap: 10px;
        }

        .brand-text {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
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
          height: 24px;
          background: var(--border);
          margin: 0 8px;
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
          padding: 6px 14px;
          font-size: 13px;
          border-radius: var(--radius-sm);
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: none;
          transform: none;
        }

        @media (max-width: 768px) {
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