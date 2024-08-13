import { useEffect, useState } from "react";
import styles from "../../styles/organisms/Tasks.module.css";
import { useSelector } from "react-redux";
import TaskMolecule from "../molecules/TaskMolecule";
import ButtonDiamond from "../atoms/ButtonDiamond";
import BackgroundGrey from "../atoms/BackgroundGrey";
import Dropdown from "../molecules/Dropdown";
import TaskModal from "./TaskModal";
import TodoModal from "./TodoModal";

const link = process.env.backLink;

// Le composant Tasks est le composant parent qui gère la liste des tâches et contrôle l'affichage de la
// modale TaskModal.
// Le composant TaskModal est un enfant, et il reçoit les props : open, handleClose,
// task, et fetchTasks pour faire le CRUD des taches

const Tasks = () => {
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
                setTask(data.data);
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
                const fetchedTasks = data.data.map((element) => (
                    <div onClick={handleFetchDetail}>
                        <TaskMolecule
                            key={element._id}
                            taskId={element._id}
                            endDate={element.endDate}
                            isDone={element.isDone}
                        >
                            <p>{element.name}</p>
                            <Dropdown
                                addTodo={() => handleAddTodo(element)}
                                onEdit={() => handleEditClick(element)}
                                onDelete={() => handleDelete(element._id)}
                            />
                        </TaskMolecule>
                    </div>
                ));
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
        <BackgroundGrey width="60%">
            <div className={styles.header}>
                <div className={styles.flex}></div>
                <h2 className={styles.title}>
                    Tâches <span>?</span>
                </h2>

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
            />
            <TodoModal
                open={openTodoModal}
                handleClose={handleCloseTodoModal}
                task={selectedTask}
                fetchTasks={fetchTasks}
            />

            {tasks.length > 0 ? tasks : <p>Aucune tâche n'est disponible.</p>}
        </BackgroundGrey>
    );
};

export default Tasks;
