import styles from "../../styles/atoms/TitleAtom.module.css";
import Button from "./Button";

const TitleAtoms = ({ title, func }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.btn}></div>
        <h1 className={styles.text}>{title}</h1>
        <div className={styles.btn}>
          <Button
            icon="material-symbols:tag"
            variant="primary"
            func={func}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default TitleAtoms;
