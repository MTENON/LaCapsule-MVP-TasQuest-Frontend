import { useEffect, useState } from "react";
import moment from "moment";
import BackgroundGrey from "../atoms/BackgroundGrey";
import DetailTask from "../molecules/DetailTask";

const Todos = ({ task, forceUpdate }) => {
    // Logique avant le return
    const [taskDetails, setTaskDetails] = useState(null);

    useEffect(() => {
        if (task) {
            setTaskDetails({
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
            });
        }
    }, [task, forceUpdate]);

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
