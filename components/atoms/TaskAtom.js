import styles from "../../styles/atoms/TaskAtom.module.css";

const TaskAtom = ({ children }) => {
    return (
        <>
            <div className={styles.taskContainer}>{children}</div>
        </>
    );
};

export default TaskAtom;
