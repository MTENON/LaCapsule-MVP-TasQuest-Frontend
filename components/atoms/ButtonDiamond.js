import styles from "../../styles/atoms/Button.module.css";
import { Icon } from "@iconify-icon/react";

//icon pour changer le type d'icone
//variant pour changer la couleur du boutton

function ButtonDiamond({ icon, variant, func, iconSize = "iconSizeM" }) {
    const buttonStyles = {
        primary: { backgroundColor: "#a50104", color: "#fcd757" },
        secondary: { backgroundColor: "#fcd757", color: "#a50104" },
        primaryS: {
            width: "55px",
            height: "55px",
            backgroundColor: "#a50104",
            color: "#fcd757",
        },
    };

    const handleClick = () => {
        func();
    };

    return (
        <button
            onClick={handleClick}
            className={styles.diamond}
            style={buttonStyles[variant]}
        >
            <Icon
                style={{ transform: "rotate(-45deg)" }}
                className={styles[iconSize]}
                icon={icon}
            />
        </button>
    );

    // //LES ICONES

    // //<Icon icon="tabler:calendar-check" />                = TODO
    // //<Icon icon="game-icons:shoulder-armor" />            = Icone de QUÊTE
    // //<Icon icon="ri:list-check-3" />                      = checking
    // //<Icon icon="game-icons:school-bag" />                = Equipement
    // //<Icon icon="ci:shopping-bag-02" />                   = SHOP
    // //<Icon icon="fa6-regular:id-card" />                  = ID Card
    // //<Icon icon="game-icons:skills" />                    = Skills
    // //<Icon icon="iconamoon:player-end-fill" />            = Boutton Play
    // //<Icon icon="mingcute:cross-fill" />                  = Boutton Plus
    // //<Icon icon="ph:pen" />                               = Boutton Stylo
    // //<Icon icon="gravity-ui:plug-connection" />           = Boutton connexion
    // //<Icon icon="icomoon-free:cross" />                   = Boutton croix pour annuler
}

export default ButtonDiamond;
