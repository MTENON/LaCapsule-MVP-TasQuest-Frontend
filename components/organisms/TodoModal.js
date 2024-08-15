import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LabeledInput from "../molecules/LabeledInput";
import AtomButton from "../atoms/AtomButton";

const link = process.env.backLink;

// Le composant TodoModal est une modal permettant d'ajouter une nouvelle tâche ("ToDo") à une tâche existante.
// Il reçoit les props : open, handleClose, task, fetchTasks, et onUpdate.

const TodoModal = ({ open, handleClose, task, fetchTasks, onUpdate }) => {
    const token = useSelector((state) => state.user.token); // Récupération du token utilisateur depuis le store Redux

    // États locaux pour gérer les valeurs du formulaire
    const [toDo, setToDo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async () => {
        if (!task || !task._id) {
            setErrorMessage("La tâche est introuvable ou non valide.");
            return;
        }

        try {
            // Envoi de la requête à l'API pour ajouter une nouvelle ToDo
            const response = await fetch(`${link}/tasks/todo/${task._id}/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ token, toDo, todoIsCompleted: false }),
            });

            const data = await response.json();
            if (data.result) {
                fetchTasks(); // Rafraîchir la liste des tâches après l'ajout de la ToDo
                onUpdate(); // Appeler la fonction de mise à jour
                handleClose(); // Fermer la modal
                resetForm(); // Réinitialiser le formulaire
            } else {
                setErrorMessage(
                    data.error || "Erreur lors de l'ajout de la ToDo."
                );
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout de la ToDo.");
            console.error(error);
        }
    };

    // Fonction pour réinitialiser les valeurs du formulaire
    const resetForm = () => {
        setToDo("");
        setErrorMessage("");
    };

    // Style de la modal
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
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
                    height="50px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="primary.main"
                >
                    Ajouter une ToDo
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <LabeledInput
                        label="Todo"
                        labelFor="todo"
                        value={toDo}
                        type="text"
                        placeholder="Saisissez la ToDo"
                        onChange={(e) => setToDo(e.target.value)}
                        variant="secondaryBottom"
                        width="100%"
                        required
                    />
                    {errorMessage && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
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
                            Ajouter
                        </AtomButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TodoModal;
