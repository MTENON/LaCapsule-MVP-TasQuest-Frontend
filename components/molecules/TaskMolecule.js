import TaskAtom from "../atoms/TaskAtom";
import Checkboxes from "../atoms/Checkboxes";
import TodoAtom from "../atoms/TodoAtom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/molecules/TaskMolecule.module.css";

const link = process.env.backLink;

const TaskMolecule = ({ taskId, isDone, children }) => {
    const [checked, setChecked] = useState(isDone);
    const [todos, setTodos] = useState([]);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        setChecked(isDone);
    }, [isDone]);

    const handleCheck = async () => {
        try {
            const response = await fetch(`${link}/tasks/isdone/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ isDone: !checked }), // Send the toggled state
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la tâche.");
            }

            setChecked((prevChecked) => !prevChecked);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
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
        };

        fetchTodos();
    }, [taskId, token]);

    const todoElements = todos.map((todo) => (
        <TodoAtom
            key={todo._id}
            todo={todo.toDo}
            taskId={taskId}
            isCompleted={todo.isCompleted}
            endDate={todo.endDate}
        />
    ));

    console.log("TodoElements:", todoElements);

    return (
        <div className={styles.taskContainer}>
            <TaskAtom taskId={taskId}>
                <Checkboxes
                    name="isDone"
                    handleCheck={handleCheck}
                    variant={checked ? "primaryChecked" : "primary"}
                    value={checked}
                />
                {children}
                {todoElements}
            </TaskAtom>
        </div>
    );
};

export default TaskMolecule;
