import styles from '../../styles/molecules/NotificationBox.module.css'
import Notification from '../atoms/Notification'

function NotificationBox(props) {

    /* 
    props {
    showNotifications > fonction qui permet de modifier la valeur de isShown en inverse data flow et de l'afficher à l'écran
    content > tableau contenant les titres et les content des Notifications
    }

    Pour faire fonctionner les notifications il faut ajouter dans le composant supérieur:

      //Fake data for exemple
    let notifications = [
    { title: "Notification 1", content: "Coucou je suis un children prop." },
    { title: "Notification 2 qui déborde", content: "Coucou je suis une notification énorme qui va déborder de ouf." },
    ]

    const [showNotifications, setShowNotifications] = useState(false)

    //functions
    function handleShowNotifications() {
        setShowNotifications(!showNotifications)
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

