function ExerciseList({ exercises, onEdit, onDelete }) {

    return (
        <div>

            {exercises.map(exercise => (

                <div
                    key={exercise.id}
                    style={styles.card}
                >

                    <h3>{exercise.name}</h3>

                    <p>
                        {exercise.sets} Sets •
                        {exercise.reps} Reps •
                        {exercise.weight} kg
                    </p>

                    <button onClick={() => onEdit(exercise)}>
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(exercise.id)}
                        style={{marginLeft:"10px"}}
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "10px"
    }
};

export default ExerciseList;