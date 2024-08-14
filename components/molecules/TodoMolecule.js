import TaskAtom from "../atoms/TaskAtom";

const TodoMolecule = ({ children }) => {
    return (
        <TaskAtom style={{ width: "100%" }}>
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
