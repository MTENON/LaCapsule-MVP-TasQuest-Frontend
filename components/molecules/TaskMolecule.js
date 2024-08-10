import Button from "../atoms/Button";
import TaskAtom from "../atoms/TaskAtom";
import Checkboxes from "../atoms/Checkboxes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/molecules/TaskMolecule.module.css";

const link = process.env.backLink;

const TaskMolecule = ({ taskId, isDone, children }) => {
    const [checked, setChecked] = useState(false);
    const [taskIsDone, setTaskIsDone] = useState(isDone);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        setChecked(isDone);
    }, [taskIsDone]);

    async function handleCheck(value) {
        try {
            const response = await fetch(`${link}/tasks/isdone/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, isDone: value }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la tâche.");
            }

            setChecked(value);
        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    function handleEdit() {}

    return (
        <TaskAtom taskId={taskId}>
            <Checkboxes
                handleCheck={handleCheck}
                variant={checked ? "primaryChecked" : "primary"}
            />
            {children}
            <Button
                variant="primary"
                icon="ph:pen"
                handleClick={handleEdit}
                classeName={styles.iconSize}
            />
        </TaskAtom>
    );
};

export default TaskMolecule;
