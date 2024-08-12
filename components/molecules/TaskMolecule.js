import TaskAtom from "../atoms/TaskAtom";
import Checkboxes from "../atoms/Checkboxes";
import TodoAtom from "../atoms/TodoAtom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/molecules/TaskMolecule.module.css";

const link = process.env.backLink;

// Le composant est un enfant de Tasks,il gère l'affichage d'une tâche individuelle ainsi que la gestion de isDone.
// Il reçoit les props taskId, isDone, et children du parent Tasks, et utilise le composant TaskAtom comme conteneur pour la tâche et Checkboxes pour gérer son état.

const TaskMolecule = ({ taskId, isDone, children }) => {
    const [checked, setChecked] = useState(false);
    const [taskIsDone, setTaskIsDone] = useState(isDone);
    const [todos, setTodos] = useState([]);
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
            setTaskIsDone(value);
            setChecked(value);
        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await fetch(`${link}/tasks/todo/${taskId}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const data = await response.json();
                if (data.result) {
                    console.table(data.todos);
                    setTodos(data.todos);
                } else {
                    console.error(
                        "Erreur lors de la récupération des todos:",
                        data.error
                    );
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des ToDos:",
                    error
                );
            }
        }

        fetchTodos();
    }, [taskId, token]);

    const todoElements = todos.map((todo) => {
        return (
            <TodoAtom
                key={todo._id}
                todo={todo.toDo}
                taskId={taskId}
                isCompleted={todo.isCompleted}
            />
        );
    });

    console.log("TodoElements:", todoElements);
    return (
        <div className={styles.taskContainer}>
            <TaskAtom taskId={taskId}>
                <Checkboxes
                    handleCheck={handleCheck}
                    variant={checked ? "primaryChecked" : "primary"}
                />
                {children}
                {todoElements}
            </TaskAtom>
        </div>
    );
};

export default TaskMolecule;
