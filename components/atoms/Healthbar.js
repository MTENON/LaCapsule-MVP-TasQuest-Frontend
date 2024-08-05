import styles from '../../styles/atoms/healthbar.module.css'

function Healthbar(props) {

    //La valeur de healthValue en % défini la taille de la jauge rouge
    let healthValue = 50; //valeur par défaut
    healthValue = props.health;

    let iconstyle = {
        color: '#A50104',
        height: '50px',
        width: '50px',
        fontSize: '48px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

    let heathbarGaugeStyle = {
        width: `${healthValue}%`,
    }

    return (
        <div className={styles.healthbarContainer}>
            <span className="material-icons" style={iconstyle}>favorite</span>
            <div className={styles.barOutline}>
                <div className={styles.bar} style={heathbarGaugeStyle}></div>
            </div>
        </div>
    )
}

export default Healthbar;