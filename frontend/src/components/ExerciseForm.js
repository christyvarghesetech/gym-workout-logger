import { useState } from "react";

function ExerciseForm({ onSave }) {

    const [form, setForm] = useState({
        name:"",
        sets:"",
        reps:"",
        weight:"",
    });

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });

    };

    return (

        <div style={{marginBottom:"30px"}}>

            <input
                name="name"
                placeholder="Exercise Name"
                onChange={handleChange}
            />

            <input
                name="sets"
                placeholder="Sets"
                onChange={handleChange}
            />

            <input
                name="reps"
                placeholder="Reps"
                onChange={handleChange}
            />

            <input
                name="weight"
                placeholder="Weight"
                onChange={handleChange}
            />

            <button onClick={()=>onSave(form)}>
                Add Exercise
            </button>

        </div>

    );

}

export default ExerciseForm;