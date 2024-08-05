import styles from "../styles/Home.module.css";
import { useState } from "react";

import Money from "./atoms/Money";
import XPContainer from "./atoms/XPContainer";
import Difficulty from "./atoms/Difficulty";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <Difficulty points="5" />
      </main>
    </div>
  );
}

export default Home;
