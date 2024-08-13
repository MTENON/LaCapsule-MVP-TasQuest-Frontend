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
import CharacterNameModal from "./CharacterNameModal";

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

export default function UserFormModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); emptyForm() };

    //Déclaration des états du formulaire
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [data, setData] = useState({})

    //vider le formulaire
    function emptyForm() {
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    React.useEffect(() => {
        const pattern = /^[a-zA-Z0-9]{4,10}$/g;
        const patternPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (pattern.test(username) && patternEmail.test(email)) {
            if (patternPassword.test(password) && patternPassword.test(password)) {
                if (password === confirmPassword) {
                    setPasswordError(false)
                    setIsFormValid(true)
                    setData({ username, email, password })
                } else {
                    setPasswordError(true)
                    setIsFormValid(false)
                    // emptyForm()
                }
            } else {
                setPasswordError(false)
                setIsFormValid(false)
            }
        } else {
            setPasswordError(false)
            setIsFormValid(false)
        }


    }, [username, password, confirmPassword, email])

    return (
        <div>
            <Button
                style={{
                    color: '#a50104',
                    width: '129px',
                    height: '57px',
                    padding: '14,20',
                    borderRadius: '15px',
                    gap: '10px',
                    margin: '2px',
                    backgroundColor: "#fcd757",
                    boxShadow: '5px',
                    fontSize: '14px'
                }}
                onClick={handleOpen}
            >Rejoins nous!</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={
                    {
                        ...style,
                        bgcolor: 'secondary.main'
                    }
                }>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.description}>
                        <p className={styles.text}>Bonjour.</p>
                        <p className={styles.text}>Veuillez vous créer un compte pour commencer votre aventure!</p>
                    </Typography>
                    <Typography id="modal-content" >
                        <div className={styles.inputBox}>

                            <div>
                                <h4 className={styles.inputTitle}>Nom d'utilisateur</h4>
                                <TextInputs
                                    value={username}
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    width={500}
                                    variant="primaryBottom"
                                />
                            </div>

                            <div>
                                <h4 className={styles.inputTitle}>Email</h4>
                                <TextInputs
                                    value={email}
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    width={500}
                                    variant="primaryBottom"
                                />
                            </div>

                            <div>
                                <h4 className={styles.inputTitle}>Mot de passe</h4>
                                <TextInputs
                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    width={500}
                                    variant="primaryBottom"
                                />
                            </div>
                            {passwordError && <h4 style={{ color: "black", marginBottom: '1px' }}>Les mots de passes renseignés ne correspondent pas!</h4>}
                            {passwordError && <h4 style={{ color: "black", marginTop: '1px' }}>Le mot de passe doit avoir une majuscule, un symbole (@$!%*?&), un chiffre et 8 caractères.</h4>}

                            <div>
                                <h4 className={styles.inputTitle}>Entrez de nouveau le mot de passe</h4>
                                <TextInputs
                                    value={confirmPassword}
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    width={500}
                                    variant="primaryBottom"
                                />
                            </div>
                        </div>
                    </Typography>
                    <Typography style={{ margin: '20px' }}>
                        <CharacterNameModal previousData={data} autorisation={isFormValid}></CharacterNameModal>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}