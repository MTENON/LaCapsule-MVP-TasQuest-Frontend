import styles from "../styles/atoms/Button.module.css";


const Button = ({ onClick, variant }) => {
    const buttonStyles = {
        primary: { backgroundColor: "#a50104", color: "#fcd757" },
        secondary: { backgroundColor: "#fcd757", color: "#a50104" },
    };
    return (
        <>
        <button
            className={styles.button}
            onClick={onClick}
            style={buttonStyles[variant]}
        >        </button>
            <span className="material-icons">face</span>
            <button className={styles.triangle}>P</button>
            <button className={styles.rectangleEmptyRed}>R</button>
            <button className={styles.btnLittleEmptyCircleRed}>ok</button>
            <button className={styles.btnRed}>A</button>
            <button className={styles.btnLittleSquareEmptyRed}>Rien</button>
            <button className={styles.btnSquareEmptyRed}>Wesh</button>
            <button className={styles.btnDiamondRed}>B</button>
            <button className={styles.btnEmptyCircleRed}></button>
            <button className={styles.btnCircleRed}>C</button>
            <button className={styles.btnLargeRed}>D</button>
            <button className={styles.btnYellow}>E</button>
            <button className={styles.btnSquareEmptyYellow}>Test</button>
            <button className={styles.btnLittleSquareEmptyYellow}>9</button>
            <button className={styles.btnDiamondYellow}>F</button>
            <button className={styles.btnCircleYellow}>G</button>
            <button className={styles.btnLargeYellow}>H</button>
            </>
    );
};

export default Button;
