import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-header">
          <Link to="/" className="auth-brand">CampusPass</Link>
        </div>

        <div className="auth-card">

          <div className="auth-card-header">
            <h1>Create account</h1>
            <p>Get started with CampusPass today</p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: 20px;
        }

        .auth-container {
          width: 100%;
          max-width: 420px;
          animation: fadeInUp 0.5s ease;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-brand {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .auth-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px 36px;
        }

        .auth-card-header {
          margin-bottom: 32px;
        }

        .auth-card-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .auth-card-header p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .auth-error {
          background: var(--danger-light);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
          border: 1px solid rgba(232, 64, 87, 0.2);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .auth-submit {
          width: 100%;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          margin-top: 8px;
        }

        .auth-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .auth-footer {
          text-align: center;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .auth-footer p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .auth-link {
          color: var(--accent);
          font-weight: 500;
        }

        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Register;