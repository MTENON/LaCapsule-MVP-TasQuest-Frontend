import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LabeledInput from "./LabeledInput";
import Checkboxes from "../atoms/Checkboxes";
import AtomButton from "../atoms/AtomButton";
import moment from "moment";

const link = process.env.backLink;

const stylePause = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",
  height: "60%",
  //   backgroundColor: "#a50104",
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
const stylePlay = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  height: "25%",
  //   backgroundColor: "#a50104",
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

function PauseHabits({ taskId, pause, refreshHabits, dropdown }) {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pauseDescription, setPauseDescription] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [resetForm, setResetForm] = useState(false);
  const [errDate, setErrDate] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setResetForm(!resetForm);
  };
  const handleClose = () => {
    setOpen(false);
    setResetForm(!resetForm);
    refreshHabits();
    dropdown();
  };

  const handleChecked = () => setChecked(true);

  useEffect(() => {
    setPauseDescription();
    setEndDate();
    setErrDate(false);
  }, [resetForm]);

  const handlePause = async () => {
    try {
      const now = moment().utc().format("YYYY-MM-DD");

      if (endDate < now) {
        setErrDate(true);
        return;
      }
      const response = await fetch(`${link}/habits/pause`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          PauseEndDate: endDate,
          pauseDesc: pauseDescription,
        }),
      });

      const data = await response.json();

      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la mise en pause de l'habitude");
      }

      handleClose();
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnpause = async () => {
    try {
      const response = await fetch(`${link}/habits/unpause`, {
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
        throw new Error("Erreur lors de la de-pause de l'habitude");
      }
      handleClose();
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!pause ? (
        <>
          <MenuItem onClick={handleOpen}>Pause</MenuItem>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={stylePause}>
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
                Pause
              </Typography>
              <Box
                id="modal-modal-description"
                sx={{ mt: 2, width: "70%", height: "80%", gap: "2%" }}
              >
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
                  <Typography color="secondary.main">
                    Pause à durée indéterminée
                  </Typography>
                  <Checkboxes
                    name="indéterminée"
                    handleCheck={handleChecked}
                    value={checked}
                    variant={checked ? "secondaryChecked" : "secondary"}
                  />
                </Box>

                {errDate ? (
                  <Typography color="secondary.main">
                    Votre pause ne peut pas finir avant même d'avoir commencer!
                  </Typography>
                ) : (
                  <Typography color="secondary.main">
                    Voulez vous donner une date de fin à votre pause?
                  </Typography>
                )}
                <LabeledInput
                  label=""
                  labelFor="dateInput"
                  value={endDate}
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  variant="secondaryBottom"
                  width="100%"
                />
                <Typography color="secondary.main">
                  Voulez vous donner une description à votre pause?
                </Typography>
                <LabeledInput
                  label=""
                  labelFor="description"
                  value={pauseDescription}
                  onChange={(e) => setPauseDescription(e.target.value)}
                  placeholder="Saisissez une description"
                  width="100%"
                  height="100px"
                  variant="secondary"
                  isTextarea={true}
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
                <AtomButton handleClick={handlePause} variant="secondary">
                  Pause
                </AtomButton>
              </Box>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <MenuItem onClick={handleOpen}>Play</MenuItem>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={stylePlay}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                bgcolor="secondary.main"
                borderRadius="20px"
                height="25%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="primary.main"
              >
                Play
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "5%",
                  margin: "2%",
                }}
              >
                <Box
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    width: "100%",
                    height: "80%",
                    gap: "5%",
                    margin: "6%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="secondary.main">
                    Voulez vous relancer cette habitude ?
                  </Typography>
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
                  <AtomButton handleClick={handleUnpause} variant="secondary">
                    Relancer
                  </AtomButton>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default PauseHabits;
