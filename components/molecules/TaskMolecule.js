import TaskAtom from "../atoms/TaskAtom";
import Checkboxes from "../atoms/Checkboxes";
import TodoAtom from "../atoms/TodoAtom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/molecules/TaskMolecule.module.css";

const link = process.env.backLink;

// Le composant TaskMolecule est un composant qui gère l'affichage et l'état d'une tâche, y compris la gestion
// des "ToDos" associés et l'état de la tâche (complétée ou non).

const TaskMolecule = ({ taskId, isDone, children }) => {
    const [checked, setChecked] = useState(isDone); // État pour gérer si la tâche est marquée comme complétée
    const [todos, setTodos] = useState([]); // État pour stocker les "ToDos" associés à la tâche
    const token = useSelector((state) => state.user.token); // Récupération du token utilisateur depuis le store Redux

    // useEffect pour mettre à jour l'état 'checked' lorsque 'isDone' change
    useEffect(() => {
        setChecked(isDone);
    }, [isDone]);

    // Fonction pour gérer le changement d'état de la tâche (complétée ou non)
    const handleCheck = async () => {
        try {
            const response = await fetch(`${link}/tasks/isdone/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ isDone: !checked }), // Envoi de l'état inversé
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la tâche.");
            }

            setChecked((prevChecked) => !prevChecked); // Mise à jour de l'état local après succès
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    // useEffect pour récupérer les "ToDos" associés à la tâche lorsque 'taskId' ou 'token' change
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
                    console.table(data.todos); // Affichage des "ToDos" dans la console pour debug
                    setTodos(data.todos); // Mise à jour de l'état local avec les "ToDos" récupérés
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

        fetchTodos(); // Appel de la fonction pour récupérer les "ToDos"
    }, [taskId, token]);

    return (
        <TaskAtom taskId={taskId} key={taskId}>
            {" "}
            {/* Composant TaskAtom qui enveloppe le contenu */}
            <Checkboxes
                name="isDone"
                handleCheck={handleCheck} // Gestion du clic sur la case à cocher
                variant={checked ? "primaryChecked" : "primary"} // Choix du style selon l'état "checked"
                value={checked} // Valeur de la case à cocher
            />
            {children} {/* Contenu passé en tant qu'enfant est rendu ici */}
        </TaskAtom>
    );
};

export default TaskMolecule;
