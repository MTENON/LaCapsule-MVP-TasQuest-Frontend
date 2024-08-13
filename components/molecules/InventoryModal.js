import styles from "../../styles/molecules/InventoryPanel.module.css"
import { useState } from "react";

//Import de la modale
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Gear from "../atoms/Gear";

//Import des composants

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '75%',
    width: '35%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '15px',
    overflowY: 'auto'
};

export default function InventoryModal({ children, name, message, icon }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //fake data equipment
    const equipment = {
        necklace: {
            name: 'Amulette',
            description: 'Une amulette de puissance',
            icon: '/amulettes/amulette1.png'
        },
        head: {
            name: 'Casque',
            description: 'Protège du minimum syndical',
            icon: '/casques/casque_en_cuir.png'
        },
        hand1: {
            name: 'Main 1',
            description: "Cette arme légendaire brise les rocs les plus solides.",
            icon: '/armes/lame_d_eclat.png'
        },
        body: {
            name: 'Corps',
            description: "L'armure d'Arthur. Connue pour protéger de tous les dégats.",
            icon: '/armures/armure1.png'
        },
        hand2: {
            name: 'Main 2',
            description: "Aucun objet n'est assigné",
            icon: ''
        },
        bracelet: {
            name: 'Bracelet',
            description: "Aucun objet n'est assigné",
            icon: ''
        },
        boots: {
            name: 'Bottes',
            description: "Aucun objet n'est assigné",
            icon: ''
        },
        ring: {
            name: 'Bague',
            description: 'Un anneau très unique qui brille quand il à chaud.',
            icon: '/bagues/anneau1.png'
        },
    }

    //fakedata Inventory
    const inventory = [
        {
            "name": "Épée du Guerrier",
            "description": "Une épée robuste et fiable, parfaite pour les combattants expérimentés. Elle offre un bon équilibre entre puissance et maniabilité.",
            "price": 50,
            "type": "Épée",
            "icon": "/armes/lame_d_eclat.png"
        },
        {
            "name": "Grimoire",
            "description": "Un livre spécialisé dans les sorts de conjuration, permettant de faire apparaître des créatures et des objets à partir de rien.",
            "price": 140,
            "type": "Grimoire",
            "icon": "/armes/grimoire.png"
        },
        {
            "name": "Potion de Santé",
            "description": "Une potion régénérante qui restaure une partie significative de la santé du buveur. Idéale pour les aventuriers blessés.",
            "price": 30,
            "type": "Potion",
            "icon": "/potions/potion_de_soin.png"
        },
        {
            "name": "Potion de Force",
            "description": "Une potion qui accroît la force physique du buveur, permettant des attaques plus puissantes et une meilleure capacité de levage.",
            "price": 80,
            "type": "Potion",
            "icon": "/potions/potion_de_force.png"
        },
    ]

    const objet = inventory.map((data, i) => {
        return (
            <div key={i} className={styles.equipedItem}>
                <Gear
                    name={data.name}
                    message={data.description}
                    icon={data.icon.trim()}
                />
            </div>
        )
    })


    return (
        <div className={styles.flex}>
            <div
                className={styles.modalContainer}
                onClick={handleOpen}
            >
                {children}
            </div>

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
                        <p className={styles.text}>Modifier un équipement.</p>
                    </Typography>
                    <Typography id="modal-content">
                        <div className={styles.actualItem}>
                            <h4 style={{ color: '#A50104' }}>Equipement actuel</h4>
                            <div className={styles.equipedItem}>
                                <Gear
                                    name={name}
                                    message={message}
                                    icon={icon}
                                />
                            </div>
                        </div>
                        <div className={styles.inventory}>
                            <h4 style={{ color: '#A50104' }}>Mon inventaire</h4>
                            {objet}
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}