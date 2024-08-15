import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AtomButton from "../atoms/AtomButton";
import moment from "moment";
import LabeledInput from "./LabeledInput";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "./DifficultyRating";
import { useSelector } from "react-redux";
import SelectAtom from "../atoms/SelectAtom";

const link = process.env.backLink;

// <=======> Creation d'un objet style pour la Modal <=======> \\

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

function ModifHabit({
  taskId,
  text,
  desc,
  level,
  repNumber,
  enLabel,
  fav,
  start,
  refreshHabits,
  dropdown,
}) {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);

  // <=======> Gestion des information envoyer par les inputs <=======> \\

  const [favorite, setFav] = useState(fav);
  const [title, setTitle] = useState(null);
  const [label, setLabel] = useState(null);
  const [num, setNum] = useState(1);
  const [difficulty, setDifficulty] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  // <=======> Gestion des erreurs envoyer par les inputs <=======> \\

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  // const [errorDateShort, setErrorDateShort] = useState(false);
  const errorTitleMsg = "Votre habitude a besoin d'un nom !";
  const errorDateMsg =
    "Votre habitude a besoin d'une date de début pour commencer !";
  // const errorDateShortMsg =
  //   "Votre habitude ne peut pas commencer avant aujourd'hui !";

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
    setOpen(false);
    setResetForm(!resetForm);
    dropdown();
  };

  // <=======> Mise en place des information deja enregistrer <=======> \\

  useEffect(() => {
    setTitle(text);
    setLabel(enLabel);
    setNum(repNumber);
    setDescription(desc);
    setDifficulty(level);
    setFav(fav);
    setDate(start);
    setErrorDate(false);
    // setErrorDateShort(false);
  }, [resetForm]);

  // <=======> Fonction pour envoyer les nouvelles infos de l'habitude a la DB <=======> \\

  const modifyHabits = async () => {
    try {
      // const now = moment().utc().format("YYYY-MM-DD");
      // if (endDate < now) {
      //   setErrorDateShort(true);
      //   return;
      // }
      const response = await fetch(`${link}/habits/modify`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
          name: title,
          description: description,
          difficulty: difficulty,
          number: num,
          label: label,
          isFavorite: favorite,
          startDate: moment(date).utc(),
        }),
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la modification de l'habitude");
      }
      setOpen(false);
      setResetForm(!resetForm);
      refreshHabits();
      dropdown();
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  // <=======> Fonction pour gérer la mise en favoris de l'habitude <=======> \\

  const handleFav = async () => {
    try {
      const response = await fetch(`${link}/habits/like`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
        }),
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la modification de l'habitude");
      }
      setFav(!favorite);
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Modifier</MenuItem>
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
            Modifier cette Habitude
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
              {/* {errorDateShort && (
                <Typography color="secondary.main">
                  {errorDateShortMsg}
                </Typography>
              )} */}
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
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
                    width: "100%",
                    height: "60px",
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
                    onChange={(e) =>
                      setNum(e.target.value < 1 ? 1 : e.target.value)
                    }
                    variant="secondaryBottom"
                    width="65%"
                    height="50%"
                    required={true}
                  />
                  <SelectAtom
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    variant="secondaryBottom"
                    width="250%"
                    height="76%"
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
                    modifyHabits();
                    handleErrTitle();
                    handleErrDate();
                  }}
                  variant="secondary"
                  marginBottom="3%"
                >
                  Modifier
                </AtomButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModifHabit;
