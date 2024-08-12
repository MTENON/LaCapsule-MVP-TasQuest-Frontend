import { useSelector } from "react-redux";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LabeledInput from "../molecules/LabeledInput";
import AtomButton from "../atoms/AtomButton";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "../molecules/DifficultyRating";

// Récupération du lien backend à partir des variables d'environnement
const link = process.env.backLink;

const TaskModal = ({ open, handleClose, task, fetchTasks }) => {
    // Récupération du token utilisateur depuis le store Redux
    const token = useSelector((state) => state.user.token);

    // Déclaration des états locaux pour gérer les champs du formulaire
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Effet pour synchroniser les champs du formulaire avec la tâche reçue en props
    useEffect(() => {
        if (task) {
            console.log(task);
            setTitle(task.name || ""); // Mise à jour du titre
            setDate(new Date(task.endDate || Date.now())); // Mise à jour de la date
            setDescription(task.description || ""); // Mise à jour de la description
            setDifficulty(task.difficulty); // Mise à jour de la difficulté
            setChecked(task.isUrgent || false); // Mise à jour du statut "urgent"
        } else {
            resetForm(); // Réinitialisation du formulaire si aucune tâche n'est sélectionnée
        }
    }, [task]);

    // Fonction pour réinitialiser les champs du formulaire
    const resetForm = () => {
        setTitle(""); // Réinitialiser le titre
        setDate(new Date()); // Réinitialiser la date
        setDescription(""); // Réinitialiser la description
        setDifficulty(0); // Réinitialiser la difficulté
        setChecked(false); // Réinitialiser le statut "urgent"
        setErrorMessage(""); // Réinitialiser le message d'erreur
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async () => {
        const method = task ? "POST" : "POST"; // Choix de la méthode HTTP (POST dans les deux cas ici)
        const url = task
            ? `${link}/tasks/update/${task._id}` // URL pour la mise à jour d'une tâche
            : `${link}/tasks/new`; // URL pour la création d'une nouvelle tâche

        console.log("Request URL:", url);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json", // Définition des en-têtes de requête
                    Authorization: token, // Ajout du token pour l'authentification
                },
                body: JSON.stringify({
                    name: title, // Nom de la tâche
                    difficulty, // Difficulté de la tâche
                    endDate: date, // Date de fin
                    isUrgent: checked, // Statut "urgent"
                    description, // Description de la tâche
                    tags: [], // Tags (actuellement vide)
                    token, // Ajout du token pour vérification (redondant avec l'en-tête)
                }),
            });

            const data = await response.json();
            if (data.result) {
                fetchTasks(); // Rafraîchissement de la liste des tâches
                resetForm(); // Réinitialisation du formulaire après soumission réussie
                handleClose(); // Fermeture du modal
            } else {
                // Affichage d'un message d'erreur en cas d'échec
                setErrorMessage(
                    data.error ||
                        "Erreur lors de la création/mise à jour de la tâche"
                );
            }
        } catch (error) {
            // Affichage d'un message d'erreur en cas d'exception
            setErrorMessage(
                "Erreur lors de la création/mise à jour de la tâche."
            );
        }
    };

    // Styles pour le composant Modal
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
            open={open} // Contrôle de l'ouverture du modal
            onClose={handleClose} // Gestion de la fermeture du modal
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
                    {task ? "Modifier la tâche" : "Créer une tâche"} {/* Affichage du titre selon le contexte */}
                </Typography>

                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            width: "70%",
                            margin: "40px auto",
                            height: "500px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <LabeledInput
                            label="Titre" // Champ pour le titre de la tâche
                            labelFor="titleInput"
                            value={title}
                            type="text"
                            placeholder="Titre"
                            onChange={(e) => setTitle(e.target.value)} // Mise à jour du titre dans l'état
                            variant="secondaryBottom"
                            width="100%"
                            required="true"
                        />
                        <LabeledInput
                            label="Date de fin" // Champ pour la date de fin
                            labelFor="titleInput"
                            value={date}
                            type="date"
                            onChange={(e) => setDate(e.target.value)} // Mise à jour de la date dans l'état
                            variant="secondaryBottom"
                            width="100%"
                        />
                        <LabeledInput
                            label="Description" // Champ pour la description de la tâche
                            labelFor="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} // Mise à jour de la description dans l'état
                            placeholder="Saisissez une description"
                            width="100%"
                            height="100px"
                            variant="secondary"
                            isTextarea={true} // Utilisation d'une textarea pour la description
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
                                handleCheck={setChecked} // Mise à jour de l'état "urgent"
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
                            {errorMessage && (
                                <Typography color="secondary.main">
                                    {errorMessage} {/* Affichage du message d'erreur */}
                                </Typography>
                            )}
                            <Typography>Niveau de difficulté</Typography>
                            <DifficultyRating
                                variant="secondary"
                                onClick={setDifficulty} // Mise à jour de la difficulté dans l'état
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
                                handleClick={handleClose} // Fermeture du modal sans sauvegarder
                                variant="tertiary"
                            >
                                Fermer
                            </AtomButton>
                            <AtomButton
                                handleClick={handleSubmit} // Soumission du formulaire
                                variant="secondary"
                            >
                                {task ? "Modifier" : "Créer"} {/* Bouton de soumission selon le contexte */}
                            </AtomButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskModal;