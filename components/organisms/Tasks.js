import { useEffect, useState } from "react";
import styles from "../../styles/organisms/Tasks.module.css";
import { useSelector } from "react-redux";
import moment from "moment";
import TaskMolecule from "../molecules/TaskMolecule";
import ButtonDiamond from "../atoms/ButtonDiamond";
import BackgroundGrey from "../atoms/BackgroundGrey";
import Dropdown from "../molecules/Dropdown";
import TaskModal from "./TaskModal";
import TodoModal from "./TodoModal";
import Difficulty from "../atoms/Difficulty";

const link = process.env.backLink;

// Le composant Tasks est le composant parent qui gère la liste des tâches et contrôle l'affichage de la
// modale TaskModal.
// Le composant TaskModal est un enfant, et il reçoit les props : open, handleClose,
// task, et fetchTasks pour faire le CRUD des taches

const Tasks = ({ onSelectTask, onUpdate }) => {
    const token = useSelector((state) => state.user.token);

    // Etats du composant
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [openTodoModal, setOpenTodoModal] = useState(false);

    // Ouverture et fermeture de la modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSelectedTask(null);
        setOpen(false);
    };
    // Ouverture et fermeture de la modal pour les ToDos
    const handleOpenTodoModal = () => setOpenTodoModal(true);
    const handleCloseTodoModal = () => {
        setSelectedTask(null);
        setOpenTodoModal(false);
    };
    // handleFetchDetail(element._id)
    const handleFetchDetail = async (taskId) => {
        try {
            const response = await fetch(`${link}/tasks/${taskId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            if (data.result) {
                console.log("Détails de la tâche récupérés :", data);
                onSelectTask(data.data);
            } else {
                console.error(
                    "Erreur lors de la récupération des détails:",
                    data.error
                );
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des détails:", error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`${link}/tasks/delete/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();
            if (data.result) {
                fetchTasks();
            } else {
                console.error(
                    data.error || "Erreur lors de la suppression de la tâche"
                );
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche:", error);
        }
    };
    console.log(task);

    useEffect(() => {
        fetchTasks();
    }, [token]);

    // Gestion du clic sur le bouton d'édition
    const handleEditClick = (task) => {
        setSelectedTask(task);
        handleOpen();
    };

    const handleAddTodo = (task) => {
        console.log("Tâche sélectionnée :", task);
        setSelectedTask(task);
        handleOpenTodoModal();
    };
    console.log(selectedTask);
    // Fetch des tâches
    const fetchTasks = async () => {
        try {
            const response = await fetch(`${link}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const data = await response.json();
            if (data.result) {
                const fetchedTasks = data.data.map((element) => {
                    const formattedEndDate = moment(element.endDate).format(
                        "DD/MM/YYYY"
                    );
                    const formattedStartDate = moment(element.startDate).format(
                        "DD/MM/YYYY"
                    );

                    return (
                        <div
                            key={element._id}
                            onClick={() => handleFetchDetail(element._id)}
                        >
                            <TaskMolecule
                                taskId={element._id}
                                endDate={formattedEndDate}
                                isDone={element.isDone}
                                onUpdate={onUpdate}
                            >
                                <p>{element.name}</p>
                                <div>
                                    <p>Début : {formattedStartDate}</p>
                                    <p>Fin : {formattedEndDate}</p>
                                </div>
                                <Difficulty points={element.difficulty} />
                                <Dropdown
                                    addTodo={() => handleAddTodo(element)}
                                    onEdit={() => handleEditClick(element)}
                                    onDelete={() => handleDelete(element._id)}
                                    onUpdate={onUpdate}
                                />
                            </TaskMolecule>
                        </div>
                    );
                });
                setTasks(fetchedTasks);
            } else {
                throw new Error(
                    data.message || "Erreur lors de la récupération des tâches"
                );
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <BackgroundGrey width="50%">
            <div className={styles.header}>
                <div className={styles.flex}></div>
                <h2 className={styles.title}>Liste de taches</h2>

                <ButtonDiamond
                    icon="mingcute:cross-fill"
                    func={handleOpen}
                    variant="primaryS"
                    iconSize="iconSize"
                />
            </div>

            <TaskModal
                open={open}
                handleClose={handleClose}
                task={selectedTask}
                fetchTasks={fetchTasks}
                onUpdate={onUpdate}
            />
            <TodoModal
                open={openTodoModal}
                handleClose={handleCloseTodoModal}
                task={selectedTask}
                fetchTasks={fetchTasks}
                onUpdate={onUpdate}
            />

            {tasks.length > 0 ? tasks : <p>Aucune tâche n'est disponible.</p>}
        </BackgroundGrey>
    );
};

export default Tasks;
