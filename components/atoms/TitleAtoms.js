import styles from "../../styles/atoms/TitleAtom.module.css";
import Button from "./Button";

const TitleAtoms = ({ title, func }) => {
    return (
        <>
            <div className={styles.container}>
                <h1>{title}</h1>
                <Button
                    icon="material-symbols:tag"
                    variant="primary"
                    func={func}
                ></Button>
            </div>
        </>
    );
};

export default TitleAtoms;
