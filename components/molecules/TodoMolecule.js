import TaskAtom from "../atoms/TaskAtom";

// Le composant TodoMolecule est un composant de type "molecule" qui enveloppe des éléments (children)
// dans un composant TaskAtom. Il gère également l'affichage d'une case à cocher (Checkboxes).

const TodoMolecule = ({ children }) => {
    return (
        <TaskAtom style={{ width: "100%" }}>
            {" "}
            {/* Le composant TaskAtom enveloppe le contenu */}
            <Checkboxes
                handleCheck={handleCheck} // Fonction pour gérer le changement d'état de la case à cocher
                variant={checked ? "primaryChecked" : "primary"} // Choix du style selon l'état "checked"
            />
            {children} {/* Le contenu passé en tant qu'enfant est rendu ici */}
        </TaskAtom>
    );
};

export default TodoMolecule;
