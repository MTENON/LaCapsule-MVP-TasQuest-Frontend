import styles from '../styles/Home.module.css';
import Button from './Button';
import btnDiamond from "./atoms/btnDiamond";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          <Button/>
          <btnDiamond/>
        </h1>
      </main>
    </div>
  );
}

export default Home;
