import { useEffect, useState } from "react";
import styles from "../../styles/organisms/Tasks.module.css";
import { useSelector } from "react-redux";
import TaskMolecule from "../molecules/TaskMolecule";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ButtonDiamond from "../atoms/ButtonDiamond";
import LabeledInput from "../molecules/LabeledInput";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "../molecules/DifficultyRating";
import AtomButton from "../atoms/AtomButton";

const link = process.env.backLink;

const Tasks = () => {
    const token = useSelector((state) => state.user.token);

    //Etat Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState(false);

    //Etats du formulaire
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(0);

    //Etats message d'erreur
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    function handleCheck(value) {
        setChecked(value);
    }
    const handleDifficultyClick = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${link}/tasks`, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.result) {
                const fetchedTasks = data.data.map((element) => (
                    <TaskMolecule
                        key={element._id}
                        taskId={element._id}
                        isDone={element.isDone}
                    >
                        <p>{element.name}</p>
                    </TaskMolecule>
                ));
                setTasks(fetchedTasks);
            } else {
                throw new Error(
                    data.message || "Erreur lors de la récupération des tâches"
                );
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    async function handleSubmit() {
        try {
            const response = await fetch(`${link}/tasks/new`, {
                method: "POST",
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
                // Réinitialiser le formulaire après le succès de l'envoi
                setTitle("");
                setDate("");
                setDescription("");
                setDifficulty(0);
                setChecked(false);
                setErrorMessage("");

                fetchTasks();
            }
        } catch (error) {
            console.error("Erreur : " + error);
            setErrorMessage("Erreur lors de la création de la tâche.");
        }
    }

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
        <div className={styles.container}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.flex}></div>
                    <h2 className={style.title}>
                        Tâches <span>?</span>
                    </h2>

                    <ButtonDiamond
                        icon="mingcute:cross-fill"
                        func={handleOpen}
                        variant="primaryS"
                        iconSize="iconSize"
                    ></ButtonDiamond>
                </div>
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
                            Créer un tache
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
                                    required="true"
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
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
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
                                        handleCheck={handleCheck}
                                        variant={
                                            checked
                                                ? "secondaryChecked"
                                                : "secondary"
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
                                    <Typography>
                                        Niveau de difficulté
                                    </Typography>
                                    <DifficultyRating
                                        variant="secondary"
                                        onClick={handleDifficultyClick}
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
                                        handleClick={() => setOpen(false)}
                                        variant="tertiary"
                                    >
                                        Fermer
                                    </AtomButton>
                                    <AtomButton
                                        handleClick={() => handleSubmit()}
                                        variant="secondary"
                                    >
                                        Créer
                                    </AtomButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </div>

            {tasks.length > 0 ? tasks : <p>Aucune tâche n'est disponible.</p>}
            {error ? <div>Error: {error}</div> : null}
        </div>
    );
};

export default Tasks;
