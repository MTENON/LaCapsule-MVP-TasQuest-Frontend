import styles from '../../styles/atoms/XPbar.module.css'

function XPbar(props) {

    //La valeur de XPValue en % défini la taille de la jauge rouge
    let XPValue = 50; //valeur par défaut
    XPValue = props.XP;

    let iconstyle = {
        color: '#FCD757',
        height: '50px',
        width: '50px',
        fontSize: '48px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textShadow: '5px 5px 4px rgba(0, 0, 0, 0.25)',
    }

    let XPbarGaugeStyle = {
        width: `${XPValue}%`,
    }

    return (
        <div className={styles.XPContainer}>
            <span className="material-icons" style={iconstyle}>star</span>
            <div className={styles.barOutline}>
                <div className={styles.bar} style={XPbarGaugeStyle}></div>
            </div>
        </div>
    )
}

export default XPbar;