import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      return setError("Please enter your username and password.");
    }

    try {
      setLoading(true);

      const response = await api.post("/token/", form);

      login(response.data.access, response.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>🏋️</div>
          <h1 style={styles.title}>Gym Workout Logger</h1>
          <p style={styles.subtitle}>
            Train Hard. Track Smarter.
          </p>
        </div>

        {location.state?.message && (
          <div style={styles.successBox}>{location.state.message}</div>
        )}

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>

        <p style={styles.footerText}>New to Gym Workout Logger?</p>

        <Link to="/register" style={styles.registerButton}>
          Create Account
        </Link>
      </div>
    </div>
  );
}

const gold = "#D4AF37";
const goldLight = "#F7E08C";

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #1a1a1a 0%, #0a0a0a 45%, #000000 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(212,175,55,0.12)",
    borderRadius: "50%",
    filter: "blur(90px)",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "rgba(18,18,18,0.96)",
    border: `1px solid ${gold}`,
    borderRadius: "24px",
    padding: "40px",
    backdropFilter: "blur(18px)",
    boxShadow:
      "0 0 35px rgba(212,175,55,0.18), 0 20px 50px rgba(0,0,0,0.65)",
    position: "relative",
    zIndex: 2,
  },

  logoContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },

  logo: {
    fontSize: "52px",
    marginBottom: "10px",
    filter: "drop-shadow(0 0 10px rgba(212,175,55,.4))",
  },

  title: {
    color: gold,
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#B8B8B8",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },

  inputGroup: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    color: goldLight,
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #3A3A3A",
    background: "#111111",
    color: "#FFFFFF",
    fontSize: "15px",
    outline: "none",
    transition: "all .25s ease",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    border: "none",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${gold} 0%, ${goldLight} 100%)`,
    color: "#000",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 8px 22px rgba(212,175,55,.35)",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "26px 0",
    position: "relative",
  },

  dividerText: {
    color: "#888",
    background: "#121212",
    padding: "0 12px",
  },

  footerText: {
    color: "#B8B8B8",
    textAlign: "center",
    marginBottom: "12px",
    fontSize: "14px",
  },

  registerButton: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    padding: "13px",
    borderRadius: "12px",
    border: `1px solid ${gold}`,
    color: gold,
    fontWeight: "600",
    transition: "all .25s ease",
  },

  errorBox: {
    background: "rgba(239,68,68,.12)",
    color: "#FF8A8A",
    border: "1px solid rgba(239,68,68,.35)",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "18px",
    textAlign: "center",
  },

  successBox: {
    background: "rgba(34,197,94,.12)",
    color: "#8BE28B",
    border: "1px solid rgba(34,197,94,.35)",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "18px",
    textAlign: "center",
  },
};

export default Login;