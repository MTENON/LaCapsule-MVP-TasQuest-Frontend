import styles from '../styles/Home.module.css';
import Healthbar from './atoms/healthbar';
import XPbar from './atoms/XPbar';

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Healthbar health={30}></Healthbar>
        <XPbar XP={30}></XPbar>
      </main>
    </div>
  );
}

export default Home;
