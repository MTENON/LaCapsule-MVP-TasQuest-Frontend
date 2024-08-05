import React from "react";
import styles from "../../styles/atoms/Difficulty.module.css";
import { Icon } from "@iconify-icon/react";

function Difficulty({ points }) {
  return (
    <div className={styles.container}>
      <div className={styles.Back}>
        <Icon icon="mdi:emoticon-devil" />
      </div>
      <div className={styles.textBack}>
        <p className={styles.text}>{points}</p>
      </div>
    </div>
  );
}

export default Difficulty;