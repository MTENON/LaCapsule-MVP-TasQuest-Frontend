import { useState } from "react";
import styles from "../../styles/molecules/DetailTask.module.css";
import Checkboxes from "../atoms/Checkboxes";

const DetailTask = ({
    name,
    endDate,
    description,
    difficulty,
    isDone,
    IsFavorite,
    IsUrgent,
    toDo,
    isCompleted,
}) => {
    const [done, setDone] = useState(isDone);

    const handleCheck = () => {
        setDone(!done); // Mise à jour de `done` au lieu de `isDone`
    };

    return (
        <div className={styles.container}>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Urgent : {IsUrgent ? "Oui" : "Non"}</p>
            <Checkboxes
                name={done}
                variant="secondary"
                handleCheck={handleCheck}
            />
        </div>
    );
};

export default DetailTask;
