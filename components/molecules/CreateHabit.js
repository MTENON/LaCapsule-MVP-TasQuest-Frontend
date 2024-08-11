import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AtomButton from "../atoms/AtomButton";
import LabeledInput from "./LabeledInput";
import Checkboxes from "../atoms/Checkboxes";
import DifficultyRating from "./DifficultyRating";
import { useSelector } from "react-redux";
import ButtonDiamond from "../atoms/ButtonDiamond";

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

function CreateHabit() {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    // console.log(taskId, text);
  };
  const handleClose = () => setOpen(false);

  //Etats du formulaire
  const [favorite, setFav] = useState(false);
  const [title, setTitle] = useState(null);
  const [label, setLabel] = useState(null);
  const [ogLabel, setOgLabel] = useState(null);
  const [num, setNum] = useState(1);
  const [description, setDescription] = useState(null);
  const [difficulty, setDifficulty] = useState(1);

  const trad = () => {
    switch (label) {
      case "jour(s)":
        setOgLabel("days");
        break;
      case "semaine(s)":
        setOgLabel("weeks");
        break;
      case "mois":
        setOgLabel("months");
        break;
      case "année(s)":
        setOgLabel("years");
        break;
      default:
        console.log(`problem avec l'etat label.`);
    }
  };

  const createHabits = async () => {
    try {
      const response = await fetch(`${link}/habits/create`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          number: num,
          label: ogLabel,
          description: description,
          difficulty: difficulty,
          isFavorite: favorite,
        }),
      });

      const data = await response.json();

      if (!data.result) {
        // throw new Error("Erreur lors de la creation des tâches");
        console.log(data.message);
      }

      console.log("created");
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
                  // component="h6"
                  // bgcolor="secondary.main"
                  // borderRadius="20px"
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
                    width="50%"
                    required={true}
                  />
                  <LabeledInput
                    label=""
                    labelFor="labelInput"
                    value={label}
                    type="text"
                    placeholder="Titre"
                    onChange={(e) => {
                      setLabel(e.target.value);
                      trad();
                    }}
                    variant="secondaryBottom"
                    width="100%"
                    required={true}
                  />
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
                  //   handleCheck={handleCheck}
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
                  //   onClick={handleDifficultyClick}
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
                  handleClick={() => setOpen(false)}
                  variant="tertiary"
                >
                  Fermer
                </AtomButton>
                <AtomButton
                  handleClick={() => createHabits()}
                  variant="secondary"
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
