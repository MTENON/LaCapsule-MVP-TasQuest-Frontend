import React from "react";
import styles from "../../styles/atoms/Money.module.css";
import { Icon } from "@iconify-icon/react";

function Money({ pieces }) {
  return (
    <div className={styles.container}>
      <div className={styles.piecesBack}>
        <Icon icon="ph:coins-fill" />
      </div>
      <div className={styles.textBack}>
        <p className={styles.text}>{pieces}</p>
      </div>
    </div>
  );
}

export default Money;
