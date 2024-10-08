import styles from "../../styles/atoms/AtomButton.module.css";
import { Icon } from "@iconify-icon/react";

function AtomButton({ icon, variant, handleClick, children }) {
    const buttonStyles = {
        primary: {
            backgroundColor: "#a50104",
            color: "#fcd757",
            padding: "15px 20px",
            borderRadius: "10px",
        },
        secondary: {
            backgroundColor: "#fcd757",
            color: "#a50104",
            padding: "15px 20px",
            borderRadius: "10px",
        },
        tertiary: {
            backgroundColor: "#F0EFEF",
            color: "#A50104",
            padding: "15px 20px",
            borderRadius: "10px",
        },
    };

    return (
        <button
            onClick={handleClick}
            className={styles.basiqueStyle}
            style={buttonStyles[variant]}
        >
            <Icon className={styles.iconSize} icon={icon} />
            {children}
        </button>
    );
}

export default AtomButton;

// Elements à utiliser dans le composant parent =>

// import { useState } from "react";

// Fonction de gestion du clic
// function handleButtonClick() {
//     console.log("Button clicked!");
// }

// Exemple d'utilisation avec une icône
// <Button
//   icon="mdi:home"
//   variant="primary"
//   handleClick={handleButtonClick}
// >
//   Home
// </Button>

// Exemple d'utilisation sans icône
// <Button
//   variant="tertiary"
//   handleClick={handleButtonClick}
// >
// </Button>
