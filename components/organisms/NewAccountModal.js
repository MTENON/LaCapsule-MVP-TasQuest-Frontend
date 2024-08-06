import styles from "../../styles/organisms/NewAccountModal.module.css"
import { useState } from "react";

//Import de la modale
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Import des composants
import TextInputs from "../atoms/TextInputs";

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

export default function UserFormModal({ children, func }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Déclaration des états du formulaire
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    //Fonction de soumission du formulaire
    function handleSubmit() {
        func(username, email, password, confirmPassword);
    }


    return (
        <div>
            <Button className={styles.buttonText} onClick={handleOpen}>Rejoins nous!</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.description}>
                        <p className={styles.text}>Bonjour.</p>
                        <p className={styles.text}>Veuillez vous créer un compte pour commencer votre aventure!</p>
                    </Typography>
                    <Typography id="modal-content">
                        <h4 className={styles.inputTitle}>Nom d'utilisateur</h4>
                        <TextInputs
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            width={500}
                            variant="primaryBottom"
                        />
                        <h4 className={styles.inputTitle}>Email</h4>
                        <TextInputs
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            width={500}
                            variant="primaryBottom"
                        />
                        <h4 className={styles.inputTitle}>Mot de passe</h4>
                        <TextInputs
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            width={500}
                            variant="primaryBottom"
                        />
                        <h4 className={styles.inputTitle}>Entrez de nouveau le mot de passe</h4>
                        <TextInputs
                            value={confirmPassword}
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            width={500}
                            variant="primaryBottom"
                        />
                        <button onClick={() => handleSubmit()}>HANDLE SUBMIT</button>
                    </Typography>
                    <Typography>{children}</Typography>
                </Box>
            </Modal>
        </div>
    );
}