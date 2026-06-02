import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navigation */}
      <nav className="home-nav">
        <div className="home-nav-inner">
          <span className="home-brand">CampusPass</span>
          <div className="home-nav-links">
            <Link to="/login">
              <button className="btn-ghost">Login</button>
            </Link>
            <Link to="/register">
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge badge-accent">Campus Event Platform</span>
            </div>

            <h1 className="hero-title">
              Book Campus Events<br />
              <span className="hero-accent">Effortlessly</span>
            </h1>

            <p className="hero-subtitle">
              Book college events easily, generate instant tickets,
              and manage registrations in one modern platform built
              for students and administrators.
            </p>

            <div className="hero-actions">
              <Link to="/login">
                <button className="hero-btn-primary">
                  Login to Dashboard
                </button>
              </Link>
              <Link to="/register">
                <button className="btn-outline hero-btn-secondary">
                  Create Account
                </button>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">Fast</span>
                <span className="stat-label">Ticket Booking</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">Secure</span>
                <span className="stat-label">Authentication</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">Simple</span>
                <span className="stat-label">Management</span>
              </div>
            </div>
          </div>

          <div className="hero-right">

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-number">01</div>
                <h3>Instant Ticket Booking</h3>
                <p>
                  Students can instantly book event tickets with a
                  single click and receive unique ticket IDs.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-number">02</div>
                <h3>Secure Login System</h3>
                <p>
                  JWT based authentication for both students
                  and administrators with role-based access.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-number">03</div>
                <h3>Event Management</h3>
                <p>
                  Admins can create, edit, and manage events
                  with full control over seats and schedules.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-number">04</div>
                <h3>Booking Overview</h3>
                <p>
                  View all registrations, track ticket sales,
                  and monitor event attendance in real time.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>CampusPass - College Event Booking Platform</p>
      </footer>

      <style>{`
        .home-page {
          min-height: 100vh;
          background: var(--bg-primary);
          display: flex;
          flex-direction: column;
        }

        /* Nav */
        .home-nav {
          border-bottom: 1px solid var(--border);
        }

        .home-nav-inner {
          max-width: 1200px;
          width: 92%;
          margin: 0 auto;
          padding: 0 16px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .home-brand {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .home-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Hero */
        .hero-section {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 60px 0;
        }

        .hero-content {
          max-width: 1200px;
          width: 92%;
          margin: 0 auto;
          padding: 0 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          animation: fadeInUp 0.6s ease;
        }

        .hero-accent {
          background: linear-gradient(135deg, var(--accent), #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 520px;
          animation: fadeInUp 0.6s ease 0.1s both;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
          animation: fadeInUp 0.6s ease 0.2s both;
        }

        .hero-btn-primary {
          padding: 14px 32px;
          font-size: 15px;
        }

        .hero-btn-secondary {
          padding: 14px 32px;
          font-size: 15px;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          animation: fadeInUp 0.6s ease 0.3s both;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-number {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
        }

        /* Feature Grid */
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          animation: fadeIn 0.8s ease 0.3s both;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          transition: all var(--transition-base);
          position: relative;
        }

        .feature-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .feature-number {
          font-size: 32px;
          font-weight: 800;
          color: var(--accent);
          opacity: 0.3;
          margin-bottom: 16px;
          line-height: 1;
        }

        .feature-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .feature-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Footer */
        .home-footer {
          border-top: 1px solid var(--border);
          padding: 24px 0;
          text-align: center;
        }

        .home-footer p {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Responsive */
        @media (max-width: 960px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .hero-title {
            font-size: 40px;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .hero-stats {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .stat-divider {
            display: none;
          }

          .hero-section {
            padding: 32px 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;