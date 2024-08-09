import style from "../../styles/atoms/TaskAtom.module.css";

const TaskAtom = ({ children }) => {
    return (
        <>
            <div className={style.taskContainer}>{children}</div>
        </>
    );
};

export default TaskAtom;
