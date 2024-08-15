import { useEffect, useState } from "react";
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
    insideToDos = [], // Liste des sous-tâches initiales
    forceUpdate, // Fonction pour forcer la mise à jour de la tâche
}) => {
    const [todos, setTodos] = useState(insideToDos); // État pour stocker les sous-tâches

    // Met à jour l'état `todos` lorsqu'une nouvelle liste de sous-tâches est reçue via `insideToDos`
    useEffect(() => {
        setTodos(insideToDos);
    }, [insideToDos]);

    const handleUpdateTodo = (todoId, newCheckedState) => {
        console.log("Updating todo:", todoId, "New state:", newCheckedState);
        setTodos(
            todos.map((todo) =>
                todo._id === todoId
                    ? { ...todo, todoIsCompleted: newCheckedState } // Mise à jour de l'état local
                    : todo
            )
        );
        if (forceUpdate) forceUpdate(); // Appel de la fonction pour forcer la mise à jour, si disponible
    };

    const handleDeleteTodo = (todoId) => {
        console.log("Deleting todo:", todoId);
        setTodos(todos.filter((todo) => todo._id !== todoId)); // Suppression de la sous-tâche dans l'état local
        if (forceUpdate) forceUpdate(); // Appel de la fonction pour forcer la mise à jour, si disponible
    };

    const taskElements = todos.map((todo) => (
        <TodoAtom
            key={todo._id}
            todo={todo}
            taskId={taskId}
            todoIsCompleted={todo.todoIsCompleted}
            onUpdateSuccess={handleUpdateTodo} // Gestion de la mise à jour d'une sous-tâche
            onDeleteSuccess={handleDeleteTodo} // Gestion de la suppression d'une sous-tâche
        />
    ));

    return (
        <div className={styles.container}>
            <h2>{name}</h2>
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
