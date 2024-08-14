import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import AtomButton from "../atoms/AtomButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "30%",
  bgcolor: "#a50104",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "2%",
};

const link = process.env.backLink;

function DelHabits({ taskId, refreshHabits }) {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const delHabits = async () => {
    try {
      const response = await fetch(`${link}/habits/delete`, {
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
        console.log(data.message, data.habit);
        throw new Error("Erreur lors de la suppression de l'habitude");
      }

      setOpen(false);
      refreshHabits();
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Supprimer</MenuItem>
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
            height="20%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="primary.main"
          >
            Supprimer cette Habitude
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Etes vous sûr de vouloire supprimer cette habitude? Cette action est
            irréversible.
          </Typography>
          <Box
            sx={{
              gap: "4%",
              width: "100%",
              gap: "4%",
              margin: "auto",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <AtomButton handleClick={() => setOpen(false)} variant="tertiary">
              Annuler
            </AtomButton>
            <AtomButton handleClick={() => delHabits()} variant="secondary">
              Supprimer
            </AtomButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default DelHabits;
