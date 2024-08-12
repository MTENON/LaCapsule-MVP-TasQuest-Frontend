import styles from '../../styles/atoms/XPbar.module.css'

import { Icon } from "@iconify-icon/react";

function XPbar(props) {

    /*
    props {
    XPValue > nombre de points d'experience en valeur absolue
    maxXPValue > points d'experience maximum en valeur absolue
    }
    */

    let XPValue = props.XPValue;
    let maxXPValue = props.maxXPValue

    let XPPercent = (XPValue / maxXPValue) * 100

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
        width: `${XPPercent}%`,
    }

    return (
        <div className={styles.XPContainer}>
            <Icon style={{ fontSize: '50px', color: '#fcd757' }} icon="solar:star-bold-duotone" />
            <div className={styles.barOutline}>
                <div className={styles.bar} style={XPbarGaugeStyle}></div>
                <div className={styles.values}>
                    <p >{XPValue} / {maxXPValue}</p>
                </div>
            </div>
        </div>
    )
}

export default XPbar;