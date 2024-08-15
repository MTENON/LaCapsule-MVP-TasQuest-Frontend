import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LabeledInput from "../molecules/LabeledInput";
import AtomButton from "../atoms/AtomButton";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "../molecules/DifficultyRating";

// Props:
// open: Boolean - détermine si la modal est ouverte ou fermée
// handleClose: Function - fonction pour fermer la modal
// task: Object - tâche actuelle, si elle est fournie (pour l'édition)
// fetchTasks: Function - fonction pour récupérer les tâches mises à jour
// onUpdate: Function - fonction appelée après la création ou la mise à jour d'une tâche

const link = process.env.backLink;

const TaskModal = ({ open, handleClose, task, fetchTasks, onUpdate }) => {
    // Récupération du token utilisateur depuis le store Redux
    const token = useSelector((state) => state.user.token);

    // États locaux pour gérer les valeurs du formulaire
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect pour remplir le formulaire si une tâche est fournie
    useEffect(() => {
        if (task) {
            // Mise à jour des valeurs du formulaire avec les données de la tâche
            setTitle(task.name || "");
            task.startDate && setStartDate(new Date(task.startDate));
            task.endDate && setEndDate(new Date(task.endDate));
            setDescription(task.description || "");
            setDifficulty(task.difficulty);
            setChecked(task.isUrgent || false);
        } else {
            resetForm(); // Réinitialiser le formulaire si aucune tâche n'est fournie
        }
    }, [task]);

    // Fonction pour réinitialiser les valeurs du formulaire
    const resetForm = () => {
        setTitle("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setDifficulty(1);
        setChecked(false);
        setErrorMessage(null);
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async () => {
        const method = task ? "POST" : "POST";
        const url = task
            ? `${link}/tasks/update/${task._id}`
            : `${link}/tasks/new`;

        const startDateISO = startDate
            ? new Date(startDate).toISOString()
            : null;
        const endDateISO = endDate ? new Date(endDate).toISOString() : null;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    name: title,
                    difficulty,
                    startDate: startDateISO,
                    endDate: endDateISO,
                    isUrgent: checked,
                    description,
                    tags: [],
                    token,
                }),
            });

            const data = await response.json();
            if (data.result) {
                fetchTasks(); // Rafraîchir la liste des tâches après la création/mise à jour
                onUpdate(); // Appeler la fonction de mise à jour
                resetForm(); // Réinitialiser le formulaire
                handleClose(); // Fermer la modal
            } else {
                setErrorMessage(
                    data.error ||
                        "Erreur lors de la création/mise à jour de la tâche"
                );
            }
        } catch (error) {
            setErrorMessage(
                "Erreur lors de la création/mise à jour de la tâche."
            );
        }
    };

    // Style de la modal
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 855,
        bgcolor: "primary.main",
        color: "secondary.main",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h1"
                    bgcolor="secondary.main"
                    borderRadius="20px"
                    height="82px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="primary.main"
                >
                    {task ? "Modifier la tâche" : "Créer une tâche"}
                </Typography>

                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            width: "70%",
                            margin: "40px auto",
                            height: "85%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}
                    >
                        {errorMessage && (
                            <Typography color="secondary.main">
                                {errorMessage}
                            </Typography>
                        )}
                        <LabeledInput
                            label="Titre"
                            labelFor="titleInput"
                            value={title}
                            type="text"
                            placeholder="Titre"
                            onChange={(e) => setTitle(e.target.value)}
                            variant="secondaryBottom"
                            width="100%"
                            required={true}
                        />
                        <LabeledInput
                            label="Date de début"
                            labelFor="startDateInput"
                            value={startDate}
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            variant="secondaryBottom"
                            width="100%"
                            required={false}
                        />
                        <LabeledInput
                            label="Date de fin"
                            labelFor="endDateInput"
                            value={endDate}
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            variant="secondaryBottom"
                            width="100%"
                            required={false}
                        />
                        <LabeledInput
                            label="Description"
                            labelFor="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Saisissez une description"
                            width="100%"
                            height="100px"
                            variant="secondary"
                            isTextarea={true}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>Urgent</Typography>
                            <Checkboxes
                                name="isUrgent"
                                handleCheck={setChecked}
                                variant={
                                    checked ? "secondaryChecked" : "secondary"
                                }
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                margin: 0,
                            }}
                        >
                            <Typography>Niveau de difficulté</Typography>
                            <DifficultyRating
                                variant="secondary"
                                onClick={setDifficulty}
                                note={difficulty}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "70%",
                                margin: "40px auto",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <AtomButton
                                handleClick={handleClose}
                                variant="tertiary"
                            >
                                Fermer
                            </AtomButton>
                            <AtomButton
                                handleClick={handleSubmit}
                                variant="secondary"
                            >
                                {task ? "Modifier" : "Créer"}
                            </AtomButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskModal;
