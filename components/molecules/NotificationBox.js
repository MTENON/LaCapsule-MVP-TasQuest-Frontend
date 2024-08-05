import styles from '../../styles/molecules/NotificationBox.module.css'
import Notification from '../atoms/Notification'
import { useState } from 'react'

function NotificationBox(props) {

    /* 
    props {
    showNotifications > fonction qui permet de modifier la valeur de isShown en inverse data flow et de l'afficher à l'écran
    content > tableau contenant les titres et les content des Notifications
    }
    */

    let isShown = props.isShown


    //Affichage du contenu des notifications
    let notification = props.content.map((data, i) => {
        return <Notification key={i} {...data} />
    })


    if (isShown) {
        return (
            <div className={styles.notificationBoxContainer}>
                <div className={styles.notificationBoxtitle}><h4 className={styles.titleText}>Notifications</h4></div>
                {notification}
            </div>
        )
    }
};

export default NotificationBox;

