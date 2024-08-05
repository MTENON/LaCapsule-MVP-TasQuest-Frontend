import React from "react";
import styles from "../../styles/atoms/XPContainer.module.css";
import { Icon } from "@iconify-icon/react";

function XPContainer({ points }) {
  return (
    <div className={styles.container}>
      <div className={styles.Back}>
        <Icon icon="solar:star-bold-duotone" />
      </div>
      <div className={styles.textBack}>
        <p className={styles.text}>{points}</p>
      </div>
    </div>
  );
}

export default XPContainer;

// Elements a utiliser dans le composant parent concerné =>

// import XPContainer from "./atoms/XPContainer";

// <Difficulty points="250" />
