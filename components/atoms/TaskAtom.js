import styles from "../../styles/atoms/TaskAtom.module.css";

const TaskAtom = ({ children, style }) => {
    return (
        <div className={styles.taskContainer} styles={{ width: "85%" }}>
            {children}
        </div>
    );
};

export default TaskAtom;
