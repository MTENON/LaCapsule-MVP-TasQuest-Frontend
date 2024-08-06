import styles from "../../styles/organisms/ProfilePicModal.module.css"
import { useState } from "react";

//Import de la modale
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Import des composants

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '85%',
    width: '65%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px'
};

export default function ProfilePicModal({ autorisation, previousData }) {

    /*
    Format de previousData dans cet élément
    previousData :{
    previousData.username
    previousData.password
    previousData.email
    {previousData.characterName
    }
    */

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => autorisation && setOpen(true);
    const handleClose = () => setOpen(false);

    //Déclaration des états du formulaire
    const [data, setData] = useState(previousData)


    //fakeImageData pour le développement de la modale
    const images = [
        {
            name: 'photo1',
            url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Photo1'
        },
        {
            name: 'photo2',
            url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Photo2'
        },
        {
            name: 'photo3',
            url: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Photo3'
        },
        {
            name: 'photo4',
            url: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Photo4'
        },
        {
            name: 'photo5',
            url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Photo5'
        },
        {
            name: 'photo6',
            url: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=Photo6'
        },
        {
            name: 'photo7',
            url: 'https://via.placeholder.com/150/800080/FFFFFF?text=Photo7'
        },
        {
            name: 'photo8',
            url: 'https://via.placeholder.com/150/808080/FFFFFF?text=Photo8'
        },
        {
            name: 'photo9',
            url: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Photo9'
        },
        {
            name: 'photo10',
            url: 'https://via.placeholder.com/150/008000/FFFFFF?text=Photo10'
        }
    ];

    return (
        <div>
            <Button className={styles.buttonText} onClick={handleOpen} disabled={!autorisation}>Next</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.description}>
                        <p className={styles.text}>Bonjour.</p>
                        <p className={styles.text}></p>
                    </Typography>
                    <Typography id="modal-content" >
                        <button onClick={() => handleSubmit()}>HANDLE SUBMIT</button>
                    </Typography>
                    <Typography>

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}