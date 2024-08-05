import styles from "../styles/Home.module.css";
import { useState } from "react";

import Money from "./atoms/Money";
import XPContainer from "./atoms/XPContainer";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <XPContainer points="250" />
      </main>
    </div>
  );
}

export default Home;
