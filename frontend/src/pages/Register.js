import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password) {
      return setError("All fields are required.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      await api.post("/accounts/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/login", {
        state: { message: "Account created successfully. Please log in." },
      });

    } catch (err) {
      setError(
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Create Account</h1>
        <p>Start tracking your workouts today.</p>

        <form onSubmit={handleRegister}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          {error && (
            <p style={{ color: "#EF4444", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0F172A",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#1E293B",
    color: "#F8FAFC",
    padding: "30px",
    borderRadius: "16px",
  },
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #475569",
    background: "#0F172A",
    color: "white",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#F59E0B",
    color: "#0F172A",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
  },
};

export default Register;