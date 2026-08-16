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

            const response = await api.get(`/workouts/${id}/`);

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

            <div style={styles.container}>
                <h1>Workout Session</h1>

                <h3>{session.date}</h3>

                {error && (
                    <p style={styles.error}>
                        {error}
                    </p>
                )}

                {/* Desktop Table */}

                <table
                    className="workout-table"
                    style={styles.table}
                >
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight</th>
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
                                        style={{
                                            ...styles.input,
                                            border: row.errors?.name
                                                ? "1px solid red"
                                                : "1px solid #ccc",
                                        }}
                                    />

                                    {row.errors?.name && (
                                        <small style={styles.helper}>
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
                                        style={{
                                            ...styles.smallInput,
                                            border: row.errors?.sets
                                                ? "1px solid red"
                                                : "1px solid #ccc",
                                        }}
                                    />

                                    {row.errors?.sets && (
                                        <small style={styles.helper}>
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
                                        style={{
                                            ...styles.smallInput,
                                            border: row.errors?.reps
                                                ? "1px solid red"
                                                : "1px solid #ccc",
                                        }}
                                    />

                                    {row.errors?.reps && (
                                        <small style={styles.helper}>
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
                                        style={{
                                            ...styles.smallInput,
                                            border: row.errors?.weight
                                                ? "1px solid red"
                                                : "1px solid #ccc",
                                        }}
                                    />

                                    {row.errors?.weight && (
                                        <small style={styles.helper}>
                                            {row.errors.weight}
                                        </small>
                                    )}
                                </td>

                                <td>
                                    <button
                                        style={styles.removeButton}
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
                            <label>Exercise</label>

                            <input
                                value={row.name}
                                onChange={(e) =>
                                    updateRow(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                style={{
                                    ...styles.input,
                                    border: row.errors?.name
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                }}
                            />

                            {row.errors?.name && (
                                <small style={styles.helper}>
                                    {row.errors.name}
                                </small>
                            )}

                            <label>Sets</label>

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
                                style={{
                                    ...styles.input,
                                    border: row.errors?.sets
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                }}
                            />

                            {row.errors?.sets && (
                                <small style={styles.helper}>
                                    {row.errors.sets}
                                </small>
                            )}

                            <label>Reps</label>

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
                                style={{
                                    ...styles.input,
                                    border: row.errors?.reps
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                }}
                            />

                            {row.errors?.reps && (
                                <small style={styles.helper}>
                                    {row.errors.reps}
                                </small>
                            )}

                            <label>Weight (kg)</label>

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
                                style={{
                                    ...styles.input,
                                    border: row.errors?.weight
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                }}
                            />

                            {row.errors?.weight && (
                                <small style={styles.helper}>
                                    {row.errors.weight}
                                </small>
                            )}

                            <button
                                className="full-width-btn"
                                style={styles.removeButton}
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
                        style={styles.addButton}
                        onClick={addRow}
                    >
                        + Add Exercise
                    </button>

                    <button
                        style={styles.saveButton}
                        onClick={saveWorkout}
                    >
                        Save Workout
                    </button>
                </div>

                <hr style={{ margin: "30px 0" }} />

                <h2>Saved Exercises</h2>

                {session.exercises.length === 0 ? (
                    <div style={styles.emptyState}>
                        <div
                            style={{
                                fontSize: "48px",
                                marginBottom: "10px",
                            }}
                        >
                            📋
                        </div>

                        <h3 style={{ margin: "10px 0" }}>
                            No exercises added
                        </h3>

                        <p
                            style={{
                                color: "#666",
                                textAlign: "center",
                            }}
                        >
                            Tap "Add Exercise" to begin.
                        </p>
                    </div>
                ) : (
                    session.exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            style={styles.card}
                        >
                            <strong>{exercise.name}</strong>

                            <p>
                                {exercise.sets} sets •{" "}
                                {exercise.reps} reps •{" "}
                                {exercise.weight} kg
                            </p>

                            <button
                                style={styles.deleteButton}
                                onClick={() =>
                                    deleteExercise(exercise.id)
                                }
                            >
                                Delete
                            </button>
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
        maxWidth: "900px",
        margin: "0 auto",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
    },

    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "6px",
        boxSizing: "border-box",
    },

    smallInput: {
        width: "70px",
        padding: "8px",
        borderRadius: "6px",
    },

    helper: {
        display: "block",
        color: "red",
        marginTop: "4px",
        fontSize: "12px",
    },

    error: {
        color: "red",
        marginBottom: "15px",
        fontWeight: "500",
    },

    addButton: {
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
    },

    saveButton: {
        padding: "10px 20px",
        background: "#111827",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },

    removeButton: {
        padding: "8px 12px",
        cursor: "pointer",
    },

    deleteButton: {
        marginTop: "10px",
        padding: "8px 14px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },

    card: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "12px",
    },

    emptyState: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "50px 20px",
        border: "2px dashed #999",
        borderRadius: "12px",
    },
};

export default WorkoutDetails;
