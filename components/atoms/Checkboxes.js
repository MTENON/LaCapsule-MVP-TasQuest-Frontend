import styles from "../../styles/atoms/Checkboxes.module.css";
import { useState } from "react";

function Checkboxes({ name, variant, handleCheck, doneValue }) {
    function handleClick(e) {
        handleCheck(e);
    }

    const checkboxStyles = {
        primary: { border: "3px solid #A50104" },
        secondary: { border: "3px solid #FCD757" },
        primaryChecked: {
            border: "3px solid #A50104",
            backgroundColor: "#a50104",
            position: "relative",
            color: "#fcd757",
        },
        secondaryChecked: {
            border: "3px solid #A50104",
            backgroundColor: "#FCD757",
            position: "relative",
            color: "#a50104",
        },
    };

    return (
        <>
            <div className={styles.checkboxContainer}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    name={name}
                    style={checkboxStyles[variant]}
                    onChange={(e) => handleClick(e.target.checked)}
                />
            </div>
        </>
    );
}

export default Checkboxes;

// Elements a utiliser dans le composant parent concerné =>

// import Checkboxes from "./atoms/Checkboxes";

// const [checked, setChecked] = useState(false);

// function handleCheck(value) {
//   setChecked(value);
// }

// <Checkboxes
//   name="checkOne"
//   handleCheck={handleCheck}
//   variant={checked ? "primaryChecked" : "primary"}
// />;
