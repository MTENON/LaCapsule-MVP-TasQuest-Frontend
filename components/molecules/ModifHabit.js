import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AtomButton from "../atoms/AtomButton";
import MenuItem from "@mui/material/MenuItem";
import LabeledInput from "./LabeledInput";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "./DifficultyRating";
import { useSelector } from "react-redux";
import SelectAtom from "../atoms/SelectAtom";

const link = process.env.backLink;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "85%",
  //   backgroundColor: "#a50104",
  // overflow: "scroll",
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

const optionStyle = {
  color: "#333333",
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
}) {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);

  //Etats du formulaire
  const [favorite, setFav] = useState(fav);
  const [title, setTitle] = useState(null);
  const [label, setLabel] = useState(null);
  const [num, setNum] = useState(1);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResetForm(!resetForm);
  };

  useEffect(() => {
    setTitle(text);
    setLabel(enLabel);
    setNum(repNumber);
    setDescription(desc);
    setDifficulty(level);
    setFav(fav);
    setStartDate(start);
  }, [resetForm]);

  const modifyHabits = async () => {
    try {
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
          // tags,
          difficulty: difficulty,
          number: num,
          label: label,
          isFavorite: favorite,
          startDate,
        }),
      });

      const data = await response.json();

      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la modification de l'habitude");
      }

      setOpen(false);
      setResetForm(!resetForm);
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

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
                  Longeur de l'écheance:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    // gap: "1%",
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
                    <option value="days" style={optionStyle}>
                      jour(s)
                    </option>
                    <option value="weeks" style={optionStyle}>
                      semaine(s)
                    </option>
                    <option value="months" style={optionStyle}>
                      mois
                    </option>
                    <option value="years" style={optionStyle}>
                      année(s)
                    </option>
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
                  // justifyContent: "flex-start",
                  // gap: "50%",
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
                >
                  Fermer
                </AtomButton>
                <AtomButton
                  handleClick={() => modifyHabits()}
                  variant="secondary"
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
