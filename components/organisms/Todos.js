import { useEffect, useState } from "react";
import moment from "moment";
import BackgroundGrey from "../atoms/BackgroundGrey";
import DetailTask from "../molecules/DetailTask";

// Le composant Todos affiche les détails d'une tâche sélectionnée.
// Il reçoit un prop 'task', qui contient les informations de la tâche sélectionnée.

const Todos = ({ task }) => {
    console.log("Tâche reçue dans Todos :", task);
    const [taskDetails, setTaskDetails] = useState(null); // État local pour stocker les détails de la tâche

    // useEffect pour mettre à jour les détails de la tâche lorsque la tâche est modifiée
    useEffect(() => {
        if (task) {
            const updatedTaskDetails = {
                _id: task._id,
                name: task.name,
                startDate: task.startDate
                    ? moment(task.startDate).format("DD/MM/YYYY")
                    : "Date non spécifiée",
                endDate: task.endDate
                    ? moment(task.endDate).format("DD/MM/YYYY")
                    : "Date non spécifiée",
                description: task.description || "Pas de description",
                difficulty: task.difficulty,
                isDone: task.isDone || false,
                IsFavorite: task.IsFavorite || false,
                IsUrgent: task.IsUrgent || false,
                insideToDos: task.insideToDos,
            };
            console.log("Détails de la tâche mis à jour :", updatedTaskDetails);
            setTaskDetails(updatedTaskDetails);
        }
    }, [task]);

    // Gestion des erreurs ou des cas où la tâche n'est pas disponible
    const hasError = !task && task !== null; // Si `task` est null (non chargé) mais pas undefined (cas d'une erreur ou d'absence de données)

    return (
        <BackgroundGrey width="40%">
            {hasError ? (
                <p>Erreur lors du chargement des détails de la tâche.</p>
            ) : taskDetails ? (
                <DetailTask
                    taskId={taskDetails._id}
                    name={taskDetails.name}
                    startDate={taskDetails.startDate}
                    endDate={taskDetails.endDate}
                    description={taskDetails.description}
                    difficulty={taskDetails.difficulty}
                    isDone={taskDetails.isDone}
                    IsFavorite={taskDetails.IsFavorite}
                    IsUrgent={taskDetails.IsUrgent}
                    insideToDos={taskDetails.insideToDos}
                />
            ) : (
                <p>Sélectionnez une tâche pour voir les détails.</p>
            )}
        </BackgroundGrey>
    );
};

export default Todos;
