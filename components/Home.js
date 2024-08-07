import styles from '../styles/Home.module.css';
import { useState } from 'react';

import Button from './atoms/Button';
import ButtonLarge from './atoms/ButtonLarge';
import ButtonEmpty from './atoms/ButtonEmpty';
import ButtonDiamond from './atoms/ButtonDiamond';
import ButtonCircle from './atoms/ButtonCircle';
import ButtonCircleEmpty from './atoms/ButtonCircleEmpty';

import Shop from './Shop';

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
        className={styles.buttonSpacing}
        icon={"game-icons:school-bag"} 
        variant={"secondary"}
        />

        {/* <ButtonLarge
        className={styles.buttonSpacing}
        icon={"ph:pen"}
        variant={"primary"}
        />

        <ButtonEmpty
        className={styles.buttonSpacing}
        icon={"iconamoon:player-end-fill"}
        variant={"secondary"}
        />

        <ButtonDiamond
        icon={"ci:shopping-bag-02"}
        variant={"primary"}
        />

        <ButtonCircle
        icon={"game-icons:skills"}
        variant={"secondary"}
        />

        <ButtonCircleEmpty
        icon={"fa6-regular:id-card"}
        variant={"primary"}
        /> */}

      </main>
    </div>
  );
}

export default Home;
