import styles from "../../styles/molecules/InventoryPanel.module.css"

import { useState } from 'react'
import { useSelector } from "react-redux";

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

export default function InventoryModal({ children, itemName, message, action, icon }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //fakedata Inventory
    const [inventory, setInventory] = useState(useSelector((state) => state.inventory.inventory))

    const objet = inventory.map((data, i) => {
        return (
            <div
                key={i}
                className={styles.equipedItem}
                onClick={() => action(data, { name: itemName, description: message, icon: icon })}
            >
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
                                    name={itemName}
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