import styles from "../../styles/organisms/ClassModal.module.css"
import { useState } from "react";

//Import de la modale
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Import du reducer
import { useDispatch } from "react-redux"
import { updateAllReducer } from "../../reducers/users";

//import de composants
import DiamondButton from "../atoms/ButtonDiamond";
import PopoverCustom from "../molecules/PopoverCustom"

import { useRouter } from "next/router"

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

const link = process.env.backLink

export default function ClassModal({ autorisation, previousData }) {

    const router = useRouter();

    /*
    Format de previousData dans cet élément
    previousData :{
    previousData.username
    previousData.password
    previousData.email
    previousData.characterName
    previousData.profilePic: {name, url}
    }
    */

    //Data présentes dans la modale
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => autorisation && setOpen(true);
    const handleClose = () => { setOpen(false); setChoosedPic('') };

    //Déclaration des états du formulaire
    const [data, setData] = useState(previousData);
    const [choosedPic, setChoosedPic] = useState('');
    const [images, setImages] = useState([])

    const dispatch = useDispatch();

    React.useEffect(() => {

        (async () => {
            const classesFetch = await fetch(`${link}/classes/`);
            const classesData = await classesFetch.json();

            setImages(classesData.data);
        })();

    }, [])

    React.useEffect(() => {
        setData({ ...previousData, class: choosedPic });
    }, [choosedPic])

    const image = images.map((data, i) => {
        console.log(data.icon)
        return (
            <PopoverCustom message={data.description}>
                < img
                    key={i}
                    src={data.icon.trim()}
                    placeholder={data.name}
                    className={styles.image}
                    style={choosedPic.i === i ? { border: '3px solid #A50104', borderRadius: '10px' } : {}}
                    onClick={() => { setChoosedPic({ i: i, name: data.name, url: data.url }) }
                    }
                ></img >
            </PopoverCustom>
        )
    })

    async function handleNewUser() {

        if (choosedPic !== '') {

            const fetchData = await fetch(`${link}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const newUserData = await fetchData.json()

            if (!newUserData.result) {
                window.alert('Un problème est survenu')
            } else {
                dispatch(updateAllReducer(newUserData.data));
                router.push('/tasks')
            }

        }
    }

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
                        <p className={styles.text}>A présent le choix le plus important...</p>
                        <p className={styles.text}>Choisissez votre classe!</p>
                        <Typography id="modal-modal-image" variant="h6" component="h2" className={styles.imageContainer}>
                            {image}
                        </Typography>
                    </Typography>
                    <Typography id="modal-content" >
                        <DiamondButton icon="iconamoon:player-end-fill" variant={'primary'} func={handleNewUser}></DiamondButton>
                    </Typography>
                </Box>
            </Modal>
        </div >
    );
}