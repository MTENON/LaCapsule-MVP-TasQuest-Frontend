import styles from '../styles/Home.module.css';
import NotificationBox from './molecules/NotificationBox';
import { useState } from 'react';

function Home() {

  const [showNotifications, setShowNotifications] = useState(false)

  //Fake data for exemple
  let notifications = [
    { title: "Notification 1", content: "Coucou je suis un children prop." },
    { title: "Notification 2 qui déborde", content: "Coucou je suis une notification énorme qui va déborder de ouf." },
  ]

  //functions
  function handleShowNotifications() {
    setShowNotifications(!showNotifications)
  }


  return (
    <div>
      <div className={styles.navBarUpTest}>
        <button onClick={() => handleShowNotifications()}>Show notifications</button>
        <NotificationBox content={notifications} isShown={showNotifications} />
      </div>
      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

export default Home;
