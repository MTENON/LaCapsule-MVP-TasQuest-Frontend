import styles from '../../styles/organisms/CharacterNameModal.module.css'
import { useState } from "react";

//Import de la modale
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProfilePicModal from "./ProfilePicModal";
import TextInputs from "../atoms/TextInputs";

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

export default function CharacterNameModal({ autorisation, previousData }) {

    /*
    Format de previousData dans cet élément
    previousData :{
    previousData.username
    previousData.password
    previousData.email
    }
    */

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => autorisation && setOpen(true);
    const handleClose = () => setOpen(false);

    //Déclaration des états du formulaire
    const [characterName, setCharacterName] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(previousData)

    React.useEffect(() => {
        const pattern = /^[a-zA-Z]{3,12}$/gi
        if (!pattern.test(characterName)) {
            setError(true)
        } else {
            setError(false)
            setIsFormValid(true)
            setData({ ...previousData, characterName })
        }
    }, [characterName])

    return (
        <div>
            <Button className={styles.buttonText} style={{ fontSize: '20px' }} onClick={handleOpen} disabled={!autorisation}>Next</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    ...style,
                    bgcolor: 'secondary.main'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.description}>

                        <p className={styles.text}>Merci de venir rejoindre l’aventure Tas’Quest!
                            Nous allons à présent créer votre personnage.</p>
                        <p className={styles.text}>Vous allez bientôt choisir un avatar, ainsi que votre classe.
                            Votre classe sera déterminante pour votre expérience, choisissez sagement!</p>
                        <p className={styles.text}>Mais tout d’abord... Quel sera le nom de votre personnage?</p>

                    </Typography>
                    <Typography id="modal-content" >
                        <h4 className={styles.inputTitle}>Nom du personnage</h4>
                        <TextInputs
                            value={characterName}
                            type="text"
                            onChange={(e) => setCharacterName(e.target.value)}
                            placeholder="Character name"
                            width={500}
                            variant="primaryBottom"
                        />

                    </Typography>
                    {error && <p className={styles.text}>Le nom de votre personnage ne doit pas comporter de caractères spéciaux, d'espaces et doit faire entre 3 et 10 caractères.</p>}
                    <Typography>
                        <ProfilePicModal autorisation={isFormValid} previousData={data}></ProfilePicModal>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}