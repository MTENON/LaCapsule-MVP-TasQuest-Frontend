import styles from '../../styles/atoms/Gear.module.css'

import PopoverCustom from '../molecules/PopoverCustom'

import { useState, useEffect } from 'react';

function Gear({ name, icon, message }) {

    const [imageSrc, setImageSrc] = useState('/default.png'); // Set default image

    useEffect(() => {
        const img = new Image();
        img.src = icon;
        img.onload = () => setImageSrc(icon);
        img.onerror = () => setImageSrc('/default.png');
    }, [icon]); // Re-run when `icon` changes

    return (
        // <div className={styles.gearContainer}>

        <PopoverCustom
            message={message}
            className={styles.popup}
        >

            <h4 className={styles.text}>{name}</h4>

            <div className={styles.background}>
                <img
                    src={imageSrc}
                    height={'100%'}
                    width={'100%'}
                    alt={name}
                ></img>
            </div>
        </PopoverCustom>

        // </div>
    )
}

export default Gear