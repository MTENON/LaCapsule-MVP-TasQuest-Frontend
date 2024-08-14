import { useState } from "react";
import styles from "../../styles/molecules/DetailTask.module.css";
import TodoAtom from "../atoms/TodoAtom";
import Difficulty from "../atoms/Difficulty";

const DetailTask = ({
    taskId,
    name,
    startDate,
    endDate,
    description,
    difficulty,
    isDone,
    IsUrgent,
    insideToDos = [],
    forceUpdate,
}) => {
    const [todos, setTodos] = useState(insideToDos);

    const handleUpdateTodo = (todoId, newCheckedState) => {
        console.log("Updating todo:", todoId, "New state:", newCheckedState);
        setTodos(
            todos.map((todo) =>
                todo._id === todoId
                    ? { ...todo, todoIsCompleted: newCheckedState }
                    : todo
            )
        );
        if (forceUpdate) forceUpdate();
    };

    const handleDeleteTodo = (todoId) => {
        console.log("Deleting todo:", todoId);
        setTodos(todos.filter((todo) => todo._id !== todoId));
        if (forceUpdate) forceUpdate();
    };

    const taskElements = insideToDos.map((todo) => {
        return (
            <TodoAtom
                key={todo._id}
                todo={todo}
                taskId={taskId}
                todoIsCompleted={todo.todoIsCompleted}
                onUpdateSuccess={handleUpdateTodo}
                onDeleteSuccess={handleDeleteTodo}
            />
        );
    });

    return (
        <div className={styles.container}>
            <h2>{name}</h2>
            <p>
                <b>Status :</b> {isDone ? "En cours" : "Terminée"}
            </p>
            <p>
                <b>Description :</b> {description}
            </p>
            <p>
                <b>Date de début :</b> {startDate}
            </p>
            <p>
                <b>Date de fin :</b> {endDate}
            </p>
            <p>
                <b>Urgent :</b> {IsUrgent ? "Oui" : "Non"}
            </p>
            <Difficulty points={difficulty} />
            <h3>Sous-tâches :</h3>
            <div className={styles.todosContainer}>
                {todos.length > 0 ? (
                    taskElements
                ) : (
                    <p>Aucune sous-tâche n'est disponible.</p>
                )}
            </div>
        </div>
    );
};

export default DetailTask;
