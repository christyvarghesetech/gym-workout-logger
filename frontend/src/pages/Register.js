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

        if (
            !form.username ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/accounts/register/", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            navigate("/login");
        } catch (err) {
            if (err.response?.data?.username) {
                setError(err.response.data.username[0]);
            } else if (err.response?.data?.email) {
                setError(err.response.data.email[0]);
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>

                <p className="auth-subtitle">
                    Join Gym Workout Logger and start tracking your progress.
                </p>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button
                        type="submit"
                        className="gold-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;