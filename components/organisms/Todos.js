import styles from "../../styles/organisms/Todos.module.css";
import TaskAtom from "../atoms/TaskAtom";

const Todos = () => {
    return (
        <>
            <div className={styles.container}>
                <h2>Les todos</h2>
                <TaskAtom></TaskAtom>
            </div>
        </>
    );
};

export default Todos;
