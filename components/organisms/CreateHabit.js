import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import moment from "moment";
import AtomButton from "../atoms/AtomButton";
import LabeledInput from "../molecules/LabeledInput";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "../molecules/DifficultyRating";
import { useSelector } from "react-redux";
import ButtonDiamond from "../atoms/ButtonDiamond";
import SelectAtom from "../atoms/SelectAtom";

const link = process.env.backLink;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  height: "75%",
  overflowY: "scroll",
  bgcolor: "#a50104",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "2%",
};

function CreateHabit({ refreshHabits }) {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);

  // <=======> Gestion des information envoyer par les inputs <=======> \\

  const [favorite, setFav] = useState(false);
  const [title, setTitle] = useState(null);
  const [label, setLabel] = useState("days");
  const [num, setNum] = useState(1);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [date, setDate] = useState(null);

  // <=======> Gestion des erreurs envoyer par les inputs <=======> \\

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorDateShort, setErrorDateShort] = useState(false);
  const errorTitleMsg = "Votre habitude a besoin d'un nom !";
  const errorDateMsg =
    "Votre habitude a besoin d'une date de début pour commencer !";
  const errorDateShortMsg =
    "Votre habitude ne peut pas commencer avant aujourd'hui !";

  const resetForm = () => {
    setTitle("");
    setLabel("days");
    setNum(1);
    setDescription("");
    setDifficulty(1);
    setFav(false);
    setDate(null);
    setErrorTitle(false);
    setErrorDate(false);
    setErrorDateShort(false);
  };

  const handleErrTitle = () => {
    if (title === null) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
  };

  const handleErrDate = () => {
    if (date === null) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
  };

  // <=======> Gestion de l'ouverture de la modal <=======> \\

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleFav = () => setFav(!favorite);

  const createHabits = async () => {
    try {
      const now = moment().utc().format("YYYY-MM-DD");
      if (date < now) {
        setErrorDateShort(true);
        return;
      }
      const response = await fetch(`${link}/habits/create`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          number: num,
          label: label,
          description: description,
          difficulty: difficulty,
          isFavorite: favorite,
          startDate: date,
        }),
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la creation des tâches");
      } else {
        console.log("created");
        setOpen(false);
        resetForm();
        refreshHabits();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ButtonDiamond
        icon="mingcute:cross-fill"
        func={handleOpen}
        variant="primaryS"
        iconSize="iconSize"
      ></ButtonDiamond>
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
            height="10%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="primary.main"
          >
            Créer une Habitude
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2, width: "70%", height: "80%", gap: "2%" }}
          >
            <Box
              sx={{
                width: "90%",
                margin: "auto",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                gap: "2%",
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
              {errorTitle && (
                <Typography color="secondary.main">{errorTitleMsg}</Typography>
              )}
              <LabeledInput
                label="Date de début:"
                labelFor="dateInput"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                variant="secondaryBottom"
                width="100%"
              />
              {errorDate && (
                <Typography color="secondary.main">{errorDateMsg}</Typography>
              )}
              {errorDateShort && (
                <Typography color="secondary.main">
                  {errorDateShortMsg}
                </Typography>
              )}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "2%",
                  margin: 0,
                }}
              >
                <Typography
                  variant="p"
                  height="10%"
                  width="50%"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  A répéter tout(es) les:
                </Typography>
                <Box
                  sx={{
                    width: "75%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: "2%",
                    margin: 0,
                    paddingRight: "15%",
                    paddingTop: "2%",
                  }}
                >
                  <LabeledInput
                    label=""
                    labelFor="numberInput"
                    type="number"
                    value={num}
                    // placeholder="1"
                    onChange={(e) =>
                      setNum(e.target.value < 1 ? 1 : e.target.value)
                    }
                    variant="secondaryBottom"
                    width="50px"
                    height="40px"
                    required={true}
                  />
                  <SelectAtom
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    variant="secondaryBottom"
                    width="250px"
                    height="40px"
                    marginBottom="15px"
                  >
                    <option value="days">jour(s)</option>
                    <option value="weeks">semaine(s)</option>
                    <option value="months">mois</option>
                    <option value="years">an(s)</option>
                  </SelectAtom>
                </Box>
              </Box>
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
                  gap: "2%",
                  alignItems: "center",
                }}
              >
                <Typography>Favori</Typography>
                <Checkboxes
                  name="isFavoris"
                  handleCheck={handleFav}
                  value={favorite}
                  variant={favorite ? "secondaryChecked" : "secondary"}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "2%",
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
                  gap: "4%",
                  width: "100%",
                  gap: "2%",
                  margin: "auto",
                  marginBottom: "150px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <AtomButton
                  handleClick={() => handleClose()}
                  variant="tertiary"
                  marginBottom="3%"
                >
                  Fermer
                </AtomButton>
                <AtomButton
                  handleClick={() => {
                    createHabits();
                    handleErrTitle();
                    handleErrDate();
                  }}
                  variant="secondary"
                  marginBottom="3%"
                >
                  Créer
                </AtomButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CreateHabit;
