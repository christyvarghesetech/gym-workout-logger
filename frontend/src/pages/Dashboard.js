import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        setLoading(true);

        try {
            const response = await api.get("/sessions/");
            setSessions(response.data);
        } catch {
            setError("Failed to load workouts.");
        } finally {
            setLoading(false);
        }
    };

    const createWorkout = async () => {
        setError("");

        if (!date) {
            setError("Please select a workout date.");
            return;
        }

        try {
            await api.post("/sessions/", { date });

            setDate("");

            fetchSessions();
        } catch {
            setError("Failed to create workout.");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <Navbar />

            <div className="dashboard">
                <h1>Workout Dashboard</h1>

                {error && (
                    <p style={{ color: "#dc2626", marginBottom: "15px", fontWeight: "500" }}>
                        {error}
                    </p>
                )}

                <div className="dashboard-form">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button
                        onClick={createWorkout}
                    >
                        Create Workout
                    </button>
                </div>

                <hr style={{ margin: "25px 0", borderColor: "rgba(212, 175, 55, 0.15)" }} />

                {sessions.length === 0 ? (
                    <div className="empty-state">
                        <div style={{ fontSize: "48px", marginBottom: "15px" }}>🏋️</div>

                        <h2>No workouts yet</h2>

                        <p style={{ color: "#9ca3af", marginTop: "10px" }}>
                            Create your first workout to start tracking your
                            progress.
                        </p>
                    </div>
                ) : (
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            className="workout-card"
                            onClick={() =>
                                navigate(`/workout/${session.id}`)
                            }
                        >
                            <h3>{session.date}</h3>

                            <p style={{ color: "#9ca3af", marginTop: "8px" }}>Tap to view workout details</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;