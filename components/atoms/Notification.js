import styles from '../../styles/atoms/Notification.module.css'

function Notification(props) {

    /* 
    props {
    title > titre de la notification
    content > contenu textuel de la notification
    }

    Pour être en position absolute une Notification doit être dans la NotificationBox
    */


    return (
        <div className={styles.notificationContainer}>
            <h4 className={styles.title}>{props.title}</h4>
            <p className={styles.content}>{props.content}</p>
        </div>
    )
};

export default Notification