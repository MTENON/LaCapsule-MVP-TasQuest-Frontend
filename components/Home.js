import styles from '../styles/Home.module.css';
import { useState } from 'react';

import Money from './atoms/Money';

function Home() {

  return (
    <div>
      <main className={styles.main}>
  <Money pieces="250"/>
      </main>
    </div>
  );
}

export default Home;
