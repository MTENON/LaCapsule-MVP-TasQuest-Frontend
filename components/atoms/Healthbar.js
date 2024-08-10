import styles from '../../styles/atoms/healthbar.module.css'
import { Icon } from "@iconify-icon/react";

function Healthbar(props) {

    /*
    props {
    health > nombre de points de vie en valeur absolue
    maxHealth > points de vie maximum en valeur absolue
    }
    */

    //La valeur de healthValue en % défini la taille de la jauge rouge
    let health = props?.health || 0;
    let maxHealth = props?.maxHealth || 100

    let healthPercent = (health / maxHealth) * 100

    let iconstyle = {
        color: '#A50104',
        height: '50px',
        width: '50px',
        fontSize: '48px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textShadow: '5px 5px 4px rgba(0, 0, 0, 0.25)',
    }

    let heathbarGaugeStyle = {
        width: `${healthPercent}%`,
    }

    return (
        <div className={styles.healthbarContainer}>
            <Icon icon="mdi:heart" style={iconstyle} />
            <div className={styles.barOutline}>
                <div className={styles.bar} style={heathbarGaugeStyle}></div>
                <div className={styles.values}>
                    <p >{health} / {maxHealth}</p>
                </div>

            </div>
        </div>
    )
}

export default Healthbar;