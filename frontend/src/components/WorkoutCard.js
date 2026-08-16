import { useNavigate } from "react-router-dom";

function WorkoutCard({ session }) {
    const navigate = useNavigate();

    return (
        <div
            style={styles.card}
            onClick={() => navigate(`/workout/${session.id}`)}
        >
            <h3>{session.date}</h3>
            <p>{session.exercises.length} exercises</p>
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        cursor: "pointer",
        marginBottom: "15px",
    }
};

export default WorkoutCard;