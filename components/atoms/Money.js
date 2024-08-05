import React from "react";
import styles from "../../styles/atoms/Money.module.css";
import { Icon } from "@iconify-icon/react";

function Money({ pieces }) {
  return (
    <div className={styles.container}>
      <div className={styles.Back}>
        <Icon icon="ph:coins-fill" />
      </div>
      <div className={styles.textBack}>
        <p className={styles.text}>{pieces}</p>
      </div>
    </div>
  );
}

export default Money;

// Elements a utiliser dans le composant parent concerné =>

// import Money from "./atoms/Money";

// <Money pieces="5" />

