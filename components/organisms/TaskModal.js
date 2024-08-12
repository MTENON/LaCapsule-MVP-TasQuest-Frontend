import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LabeledInput from "../molecules/LabeledInput";
import AtomButton from "../atoms/AtomButton";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "../molecules/DifficultyRating";

const link = process.env.backLink;

const TaskModal = ({ open, handleClose, task, fetchTasks }) => {
    const token = useSelector((state) => state.user.token);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (task) {
            console.log(task);
            setTitle(task.name || "");
            setDate(new Date(task.endDate || Date.now()));
            setDescription(task.description || "");
            setDifficulty(task.difficulty);
            setChecked(task.isUrgent || false);
        } else {
            resetForm();
        }
    }, [task]);

    const resetForm = () => {
        setTitle("");
        setDate(new Date());
        setDescription("");
        setDifficulty(0);
        setChecked(false);
        setErrorMessage("");
    };

    const handleSubmit = async () => {
        const method = task ? "POST" : "POST";
        const url = task
            ? `${link}/tasks/update/${task._id}`
            : `${link}/tasks/new`;

        console.log("Request URL:", url);

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
                    endDate: date,
                    isUrgent: checked,
                    description,
                    tags: [],
                    token,
                }),
            });

            const data = await response.json();
            if (data.result) {
                fetchTasks();
                resetForm();
                handleClose();
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
                            height: "500px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}
                    >
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
                            label="Date de fin"
                            labelFor="titleInput"
                            value={date}
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            variant="secondaryBottom"
                            width="100%"
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
                            {errorMessage && (
                                <Typography color="secondary.main">
                                    {errorMessage}
                                </Typography>
                            )}
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
