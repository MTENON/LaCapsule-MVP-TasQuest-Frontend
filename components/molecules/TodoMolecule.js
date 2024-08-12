import TaskAtom from "../atoms/TaskAtom";
import Checkboxes from "../atoms/Checkboxes";

const TodoMolecule = ({ todoId, todoIsCompleted, children }) => {
    return (
        <TaskAtom>
            <Checkboxes
                handleCheck={handleCheck}
                variant={checked ? "primaryChecked" : "primary"}
            />
            {children}
        </TaskAtom>
    );
};
nn;
export default TodoMolecule;
