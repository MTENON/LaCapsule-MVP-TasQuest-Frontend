import styles from "../../styles/atoms/TitleAtom.module.css";

const TitleAtoms = ({ title, width }) => {
  return (
    <>
      <div className={styles.container} style={{ width }}>
        <h1 className={styles.text}>{title}</h1>
      </div>
    </>
  );
};

export default TitleAtoms;
