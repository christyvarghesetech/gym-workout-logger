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

        if (error) {
            setError("");
        }
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
            } else if (err.response?.data?.password) {
                setError(err.response.data.password[0]);
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-background-glow register-glow-one"></div>
            <div className="register-background-glow register-glow-two"></div>

            <div className="register-card">

                {/* Logo */}
                <div className="register-logo-wrapper">
                    <div className="register-logo">
                        🏋️
                    </div>
                </div>

                {/* Heading */}
                <div className="register-heading">
                    <h1>Create Account</h1>

                    <p>
                        Start your fitness journey with
                        <span> Gym Workout Logger</span>
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleRegister}
                    className="register-form"
                >

                    {/* Username */}
                    <div className="register-field">
                        <label htmlFor="username">
                            Username
                        </label>

                        <div className="register-input-wrapper">
                            <span className="register-input-icon">
                                👤
                            </span>

                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={form.username}
                                onChange={handleChange}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="register-field">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <div className="register-input-wrapper">
                            <span className="register-input-icon">
                                ✉
                            </span>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="register-field">
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="register-input-wrapper">
                            <span className="register-input-icon">
                                🔒
                            </span>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>

                        <small className="register-hint">
                            Minimum 6 characters
                        </small>
                    </div>

                    {/* Confirm Password */}
                    <div className="register-field">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="register-input-wrapper">
                            <span className="register-input-icon">
                                🔐
                            </span>

                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="register-error">
                            <span>⚠</span>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="register-submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="register-spinner"></span>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <span>→</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="register-divider">
                    <span></span>
                    <p>OR</p>
                    <span></span>
                </div>

                {/* Login */}
                <div className="register-login">
                    <p>
                        Already have an account?
                    </p>

                    <Link to="/login">
                        Log In
                    </Link>
                </div>

                {/* Footer */}
                <div className="register-footer">
                    <span>GYM WORKOUT LOGGER</span>
                    <span>•</span>
                    <span>TRACK. TRAIN. PROGRESS.</span>
                </div>

            </div>
        </div>
    );
}

export default Register;
