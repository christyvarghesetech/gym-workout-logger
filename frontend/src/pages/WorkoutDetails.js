import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

function WorkoutDetails() {
    const { id } = useParams();

    const [session, setSession] = useState(null);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState("");

    // Fetch workout/session details
    const fetchWorkout = useCallback(async () => {
        try {
            setError("");

            const response = await api.get(`/sessions/${id}/`);

            setSession(response.data);
        } catch (error) {
            console.error("Failed to fetch workout:", error);
            setError("Failed to load workout.");
        }
    }, [id]);

    useEffect(() => {
        fetchWorkout();
    }, [fetchWorkout]);

    const addRow = () => {
        setRows([
            ...rows,
            {
                name: "",
                sets: "",
                reps: "",
                weight: "",
                errors: {},
            },
        ]);
    };

    const updateRow = (index, field, value) => {
        const updated = [...rows];

        updated[index][field] = value;

        setRows(updated);
    };

    const removeRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const validateRows = () => {
        let hasError = false;

        const validated = rows.map((row) => {
            const errors = {};

            if (!row.name.trim()) {
                errors.name = "Exercise name is required.";
                hasError = true;
            }

            if (Number(row.sets) < 1) {
                errors.sets = "Minimum 1 set.";
                hasError = true;
            }

            if (Number(row.reps) < 1) {
                errors.reps = "Minimum 1 rep.";
                hasError = true;
            }

            if (Number(row.weight) < 0) {
                errors.weight = "Weight cannot be negative.";
                hasError = true;
            }

            return {
                ...row,
                errors,
            };
        });

        setRows(validated);

        return !hasError;
    };

    const saveWorkout = async () => {
        setError("");

        if (!validateRows()) {
            setError("Please fix the highlighted fields.");
            return;
        }

        try {
            for (const row of rows) {
                await api.post(`/sessions/${id}/exercises/`, {
                    name: row.name,
                    sets: Number(row.sets),
                    reps: Number(row.reps),
                    weight: Number(row.weight),
                });
            }

            setRows([]);

            await fetchWorkout();
        } catch (error) {
            console.error("Failed to save workout:", error);
            setError("Failed to save workout.");
        }
    };

    const deleteExercise = async (exerciseId) => {
        setError("");

        try {
            await api.delete(`/exercises/${exerciseId}/`);

            await fetchWorkout();
        } catch (error) {
            console.error("Failed to delete exercise:", error);
            setError("Failed to delete exercise.");
        }
    };

    if (!session) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Navbar />

            <div className="dashboard">
                <h1 style={{ color: "#FFD700", textAlign: "center", fontSize: "40px", marginBottom: "10px" }}>Workout Session</h1>

                <h3 style={{ color: "#9ca3af", textAlign: "center", fontWeight: "500", marginBottom: "30px" }}>{session.date}</h3>

                {error && (
                    <p style={{ color: "#ef4444", marginBottom: "15px", fontWeight: "500", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                {/* Desktop Table */}

                <table
                    className="workout-table"
                >
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight (kg)</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        value={row.name}
                                        onChange={(e) =>
                                            updateRow(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Exercise name"
                                        style={{
                                            ...styles.input,
                                            border: row.errors?.name
                                                ? "1px solid #ef4444"
                                                : "1px solid #3A3A3A",
                                            background: "#111",
                                            color: "#fff",
                                        }}
                                    />

                                    {row.errors?.name && (
                                        <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                            {row.errors.name}
                                        </small>
                                    )}
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={row.sets}
                                        onChange={(e) =>
                                            updateRow(
                                                index,
                                                "sets",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        style={{
                                            ...styles.smallInput,
                                            border: row.errors?.sets
                                                ? "1px solid #ef4444"
                                                : "1px solid #3A3A3A",
                                            background: "#111",
                                            color: "#fff",
                                        }}
                                    />

                                    {row.errors?.sets && (
                                        <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                            {row.errors.sets}
                                        </small>
                                    )}
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={row.reps}
                                        onChange={(e) =>
                                            updateRow(
                                                index,
                                                "reps",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        style={{
                                            ...styles.smallInput,
                                            border: row.errors?.reps
                                                ? "1px solid #ef4444"
                                                : "1px solid #3A3A3A",
                                            background: "#111",
                                            color: "#fff",
                                        }}
                                    />

                                    {row.errors?.reps && (
                                        <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                            {row.errors.reps}
                                        </small>
                                    )}
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        value={row.weight}
                                        onChange={(e) =>
                                            updateRow(
                                                index,
                                                "weight",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        style={{
                                            ...styles.smallInput,
                                            border: row.errors?.weight
                                                ? "1px solid #ef4444"
                                                : "1px solid #3A3A3A",
                                            background: "#111",
                                            color: "#fff",
                                        }}
                                    />

                                    {row.errors?.weight && (
                                        <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                            {row.errors.weight}
                                        </small>
                                    )}
                                </td>

                                <td>
                                    <button
                                        style={{ background: "transparent", color: "#ef4444", border: "none", fontSize: "16px", cursor: "pointer", padding: "8px 12px" }}
                                        onClick={() =>
                                            removeRow(index)
                                        }
                                    >
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Cards */}

                <div className="mobile-card">
                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className="exercise-card"
                        >
                            <label style={{ display: "block", marginBottom: "6px", color: "#FFD700", fontWeight: "600" }}>Exercise</label>

                            <input
                                value={row.name}
                                onChange={(e) =>
                                    updateRow(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                placeholder="Exercise name"
                                style={{
                                    ...styles.input,
                                    border: row.errors?.name
                                        ? "1px solid #ef4444"
                                        : "1px solid #3A3A3A",
                                    background: "#111",
                                    color: "#fff",
                                }}
                            />

                            {row.errors?.name && (
                                <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                    {row.errors.name}
                                </small>
                            )}

                            <label style={{ display: "block", margin: "12px 0 6px", color: "#FFD700", fontWeight: "600" }}>Sets</label>

                            <input
                                type="number"
                                min="1"
                                value={row.sets}
                                onChange={(e) =>
                                    updateRow(
                                        index,
                                        "sets",
                                        e.target.value
                                    )
                                }
                                placeholder="0"
                                style={{
                                    ...styles.input,
                                    border: row.errors?.sets
                                        ? "1px solid #ef4444"
                                        : "1px solid #3A3A3A",
                                    background: "#111",
                                    color: "#fff",
                                }}
                            />

                            {row.errors?.sets && (
                                <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                    {row.errors.sets}
                                </small>
                            )}

                            <label style={{ display: "block", margin: "12px 0 6px", color: "#FFD700", fontWeight: "600" }}>Reps</label>

                            <input
                                type="number"
                                min="1"
                                value={row.reps}
                                onChange={(e) =>
                                    updateRow(
                                        index,
                                        "reps",
                                        e.target.value
                                    )
                                }
                                placeholder="0"
                                style={{
                                    ...styles.input,
                                    border: row.errors?.reps
                                        ? "1px solid #ef4444"
                                        : "1px solid #3A3A3A",
                                    background: "#111",
                                    color: "#fff",
                                }}
                            />

                            {row.errors?.reps && (
                                <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                    {row.errors.reps}
                                </small>
                            )}

                            <label style={{ display: "block", margin: "12px 0 6px", color: "#FFD700", fontWeight: "600" }}>Weight (kg)</label>

                            <input
                                type="number"
                                min="0"
                                value={row.weight}
                                onChange={(e) =>
                                    updateRow(
                                        index,
                                        "weight",
                                        e.target.value
                                    )
                                }
                                placeholder="0"
                                style={{
                                    ...styles.input,
                                    border: row.errors?.weight
                                        ? "1px solid #ef4444"
                                        : "1px solid #3A3A3A",
                                    background: "#111",
                                    color: "#fff",
                                }}
                            />

                            {row.errors?.weight && (
                                <small style={{ display: "block", color: "#ef4444", marginTop: "4px", fontSize: "12px" }}>
                                    {row.errors.weight}
                                </small>
                            )}

                            <button
                                className="full-width-btn"
                                style={{ background: "#B91C1C", color: "white", padding: "10px", marginTop: "15px", cursor: "pointer" }}
                                onClick={() =>
                                    removeRow(index)
                                }
                            >
                                Remove Exercise
                            </button>
                        </div>
                    ))}
                </div>

                {/* Buttons */}

                <div className="button-row">
                    <button
                        style={{
                            background: "transparent",
                            border: "1px solid #D4AF37",
                            color: "#D4AF37",
                            fontWeight: "600",
                            padding: "14px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            flex: 1,
                        }}
                        onClick={addRow}
                    >
                        + Add Exercise
                    </button>

                    <button
                        style={{
                            background: "linear-gradient(135deg, #FFD700, #C99A00)",
                            color: "black",
                            fontWeight: "800",
                            border: "none",
                            padding: "14px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            flex: 1,
                        }}
                        onClick={saveWorkout}
                    >
                        Save Workout
                    </button>
                </div>

                <hr style={{ margin: "40px 0", borderColor: "rgba(212, 175, 55, 0.15)" }} />

                <h2 style={{ color: "#FFD700", marginBottom: "20px" }}>Saved Exercises</h2>

                {session.exercises.length === 0 ? (
                    <div className="empty-state">
                        <div
                            style={{
                                fontSize: "48px",
                                marginBottom: "15px",
                            }}
                        >
                            📋
                        </div>

                        <h3 style={{ margin: "10px 0", color: "#fff" }}>
                            No exercises added
                        </h3>

                        <p
                            style={{
                                color: "#9ca3af",
                                textAlign: "center",
                            }}
                        >
                            Tap "Add Exercise" to begin.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
                        {session.exercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className="workout-card"
                                style={{ margin: 0, cursor: "default" }}
                            >
                                <strong style={{ fontSize: "18px", color: "#FFD700" }}>{exercise.name}</strong>

                                <p style={{ color: "#e2e8f0", margin: "8px 0 12px" }}>
                                    {exercise.sets} sets • {exercise.reps} reps • {exercise.weight} kg
                                </p>

                                <button
                                    style={{
                                        padding: "8px 14px",
                                        background: "#B91C1C",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        deleteExercise(exercise.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    input: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "8px",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color .2s",
    },

    smallInput: {
        width: "80px",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color .2s",
    },
};

export default WorkoutDetails;
