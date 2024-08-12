import { useState } from "react";
import Checkboxes from "../atoms/Checkboxes";
import styles from "../../styles/atoms/TodoAtom.module.css";

const link = process.env.backLink;

const TodoAtom = ({ todo, taskId, isCompleted }) => {
    const [isChecked, setIsChecked] = useState(isCompleted);

    const handleCheck = async (value) => {
        setIsChecked(value);
        try {
            const response = await fetch(
                `${link}/tasks/todo/${taskId}/${todo._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isCompleted: value }),
                }
            );

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du ToDo.");
            }
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <div className={styles.todoAtomContainer}>
            <Checkboxes
                handleCheck={handleCheck}
                variant={isChecked ? "primaryChecked" : "primary"}
            />
            <span>{todo.toDo}</span>
        </div>
    );
};

export default TodoAtom;
