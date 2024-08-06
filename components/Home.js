import styles from '../styles/Home.module.css';
import { useState } from 'react';

import Button from './atoms/Button';

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
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Button 
        icon={"game-icons:school-bag"} variant={"secondary"}
        />
      </main>
    </div>
  );
}

export default Home;
