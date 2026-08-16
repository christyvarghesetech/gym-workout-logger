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

            <div style={styles.container}>
                <h1 style={styles.heading}>Workout Dashboard</h1>

                {error && (
                    <p style={styles.error}>
                        {error}
                    </p>
                )}

                <div style={styles.createBox}>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={styles.input}
                    />

                    <button
                        onClick={createWorkout}
                        style={styles.button}
                    >
                        Create Workout
                    </button>
                </div>

                <hr style={styles.divider} />

                {sessions.length === 0 ? (
                    <div style={styles.emptyState}>
                        <div style={styles.icon}>🏋️</div>

                        <h2>No workouts yet</h2>

                        <p>
                            Create your first workout to start tracking your
                            progress.
                        </p>
                    </div>
                ) : (
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            style={styles.card}
                            onClick={() =>
                                navigate(`/workout/${session.id}`)
                            }
                        >
                            <h3>{session.date}</h3>

                            <p>Tap to view workout details</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
    },

    heading: {
        marginBottom: "20px",
    },

    createBox: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px",
    },

    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        flex: "1",
        minWidth: "180px",
    },

    button: {
        padding: "10px 20px",
        background: "#111827",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },

    divider: {
        margin: "25px 0",
    },

    error: {
        color: "#dc2626",
        marginBottom: "15px",
        fontWeight: "500",
    },

    emptyState: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 20px",
        border: "2px dashed #475569",
        borderRadius: "12px",
        background: "#f8fafc",
    },

    icon: {
        fontSize: "48px",
        marginBottom: "10px",
    },

    card: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "15px",
        cursor: "pointer",
        transition: "0.2s ease",
        background: "white",
    },
};

export default Dashboard;