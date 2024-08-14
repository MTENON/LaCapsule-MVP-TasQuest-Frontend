import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LabeledInput from "../molecules/LabeledInput";
import AtomButton from "../atoms/AtomButton";

const link = process.env.backLink;

const TodoModal = ({ open, handleClose, task, fetchTasks, onUpdate }) => {
    const token = useSelector((state) => state.user.token);

    const [toDo, setToDo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        if (!task || !task._id) {
            setErrorMessage("La tâche est introuvable ou non valide.");
            return;
        }

        try {
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
                fetchTasks();
                onUpdate();
                handleClose();
                resetForm();
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

    const resetForm = () => {
        setToDo("");
        setErrorMessage("");
    };

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
