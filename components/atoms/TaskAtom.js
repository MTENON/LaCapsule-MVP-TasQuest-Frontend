import styles from "../../styles/atoms/TaskAtom.module.css";

const TaskAtom = ({ children, width, backgroundColor }) => {
    return (
        <>
            <div className={styles.taskContainer} style={{ width: "85%" }}>
                {children}
            </div>
        </>
    );
};

export default TaskAtom;
