import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Checkboxes from "../atoms/Checkboxes";
import styles from "../../styles/atoms/TodoAtom.module.css";
import { useSelector } from "react-redux";

const link = process.env.backLink;

const TodoAtom = ({ todo, taskId, todoIsCompleted, onDeleteSuccess }) => {
    const token = useSelector((state) => state.user.token);
    const [checked, setChecked] = useState(!!todoIsCompleted);

    useEffect(() => {
        setChecked(!!todoIsCompleted);
    }, [todoIsCompleted]);

    const handleCheck = async () => {
        try {
            const newCheckedState = !checked;
            const response = await fetch(
                `${link}/tasks/todo/${taskId}/${todo._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        todoIsCompleted: newCheckedState,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du Todo.");
            }

            setChecked(newCheckedState);
            console.log("Mise à jour réussie", newCheckedState);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log("Attempting to delete todo with ID:", todo._id);
            const response = await fetch(
                `${link}/tasks/deletetodo/${taskId}/${todo._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({ userId: token }),
                }
            );

            const data = await response.json();

            if (!data.result) {
                throw new Error(
                    data.error || "Erreur lors de la suppression du Todo."
                );
            }

            if (onDeleteSuccess) {
                onDeleteSuccess(todo._id);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Checkboxes
                name="todoIsCompleted"
                handleCheck={handleCheck}
                variant={checked ? "primaryChecked" : "primary"}
                value={checked}
            />
            <p>{todo.toDo}</p>
            <Icon
                icon="mdi:garbage-can-circle"
                width="40"
                height="40"
                style={{ color: "#a50104" }}
                onClick={handleDelete}
            />
        </div>
    );
};

export default TodoAtom;
