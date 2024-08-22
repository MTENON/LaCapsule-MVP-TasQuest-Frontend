import styles from "../../styles/atoms/TitleAtom.module.css";

const TitleAtoms = ({ title, width, height }) => {
  return (
    <>
      <div className={styles.container} style={{ width, height }}>
        <h1 className={styles.text}>{title}</h1>
      </div>
    </>
  );
};

export default TitleAtoms;
