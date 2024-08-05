import React from "react";
import { Icon } from "@iconify-icon/react";
import styles from "../../styles/atoms/Caracs.module.css";

function Caracs({ icon, points }) {
  return (
    <>
      <div className={styles.container}>
        <Icon className={styles.icon} icon={icon} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>{points}</p>
      </div>
    </>
  );
}

export default Caracs;

// Elements a utiliser dans le composant parent concerné =>

// import Caracs from "./atoms/Caracs";

// <Caracs points="2" icon="game-icons:wingfoot" />  Dexterite

// <Caracs points="7" icon="mingcute:magic-hat-fill" /> Sagesse

// <Caracs points="4" icon="game-icons:brain" /> Intelligence

// <Caracs points="2" icon="mdi:arm-flex-outline" /> Force
