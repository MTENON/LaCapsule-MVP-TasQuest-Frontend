import styles from "../../styles/organisms/ProfilePicModal.module.css"
import { useState } from "react";

//Import de la modale
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Import des composants
import ClassModal from "./ClassModal";

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
    previousData.characterName
    }
    */

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => autorisation && setOpen(true);
    const handleClose = () => { setOpen(false); setChoosedPic('') };

    //Déclaration des états du formulaire
    const [data, setData] = useState(previousData);
    const [isFormValid, setIsFormValid] = useState(false)
    const [choosedPic, setChoosedPic] = useState('');

    React.useEffect(() => {
        choosedPic !== '' && setIsFormValid(true)
        setData({ ...previousData, choosedPic })
    }, [choosedPic])


    //fakeImageData pour le développement de la modale
    const images = [
        {
            id: 1,
            name: 'photo1',
            url: '/userpic1.png'
        },
        {
            id: 2,
            name: 'photo2',
            url: '/userpic2.png'
        },
        {
            id: 3,
            name: 'photo3',
            url: '/userpic3.png'
        }
    ];

    const image = images.map((data, i) => {
        return <img
            key={i}
            src={data.url}
            placeholder={data.name}
            className={styles.image}
            style={choosedPic.i === i ? { border: '3px solid #A50104', borderRadius: '10px' } : {}}
            onClick={() => { setChoosedPic({ i: i, name: data.name, url: data.url }) }}
        ></img>
    })

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
                        <p className={styles.text}>Il est temps de choisir votre apparence...</p>
                        <Typography id="modal-modal-image" variant="h6" component="h2" className={styles.imageContainer}>
                            {image}
                        </Typography>
                    </Typography>
                    <Typography id="modal-content" >
                        <ClassModal autorisation={isFormValid} previousData={data}></ClassModal>
                    </Typography>
                </Box>
            </Modal>
        </div >
    );
}