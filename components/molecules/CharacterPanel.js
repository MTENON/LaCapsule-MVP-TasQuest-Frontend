import styles from '../../styles/molecules/CharacterPanel.module.css'

import { useSelector } from 'react-redux'

//import de composants
import Healthbar from '../atoms/Healthbar'
import XPbar from '../atoms/XPbar'
import ButtonDiamond from '../atoms/ButtonDiamond'
import Caracs from '../atoms/Caracs'
import PopoverCustom from './PopoverCustom'

function CharacterPanel() {

    const username = useSelector((state) => state.user.username)
    //Fake popoverdata for stats and combo

    return (
        <div className={styles.characterContainer}>
            <div className={styles.intel}>
                <h2 style={{ fontSize: '32px' }}>{username}</h2>
                <img
                    src='/userpic1.png'
                    alt='image de profil'
                    width={100}
                    height={100}
                    style={{ borderRadius: '20px', border: '1px solid #A50104' }}
                ></img>
            </div>
            <div className={styles.stats}>
                <PopoverCustom
                    message="Délaissez trop de tâches et c'est la défaite assurée. La santé mesure votre endurance face à l'échec. Mais attention la voir arriver à zéro entrainera une pénalité."
                >
                    <Healthbar health={50} maxHealth={50} />
                </PopoverCustom>
                <PopoverCustom
                    message="Plus vous travaillerez plus vous accumulerez de l'expérience. Elle vous renforcera et vous fera gagner en compétences."
                >
                    <XPbar XPValue={2} maxXPValue={10} />
                </PopoverCustom>
                <h3>Niveau: 2</h3>
            </div>
            <div className={styles.caracs}>
                <div className={styles.rowCaracs}>
                    <PopoverCustom
                        message='La force représente votre capacité physique. Elle augmente vos dégats face aux monstres.'
                    >
                        <Caracs
                            icon={"mdi:arm-flex-outline"}
                            points={4}
                        />
                    </PopoverCustom>
                    <PopoverCustom
                        message="L'agilité représente votre rapidité et dextérité. Les tâches courtes seront plus efficaces pendant les quêtes."
                    >
                        <Caracs
                            icon={"game-icons:wingfoot"}
                            points={2}
                        />
                    </PopoverCustom>
                </div>
                <div className={styles.rowCaracs}>
                    <PopoverCustom
                        message="L'intelligence représente votre capacité à vous concentrer. Les tâches longues et les longues to do list sont renforcées."
                    >
                        <Caracs
                            icon={"game-icons:brain"}
                            points={1}
                        />
                    </PopoverCustom>
                    <PopoverCustom
                        message="La sagesse est votre don de ne jamais perdre votre calme. ELle augmente l'efficacité de toutes les tâches."
                    >
                        <Caracs
                            icon={"mingcute:magic-hat-fill"}
                            points={2}
                        />
                    </PopoverCustom>
                </div>
            </div>
            <div className={styles.combo}>
                <h2 style={{ fontSize: '32px' }}>Combo</h2>
                <PopoverCustom
                    message="Plus votre combo est élevé plus vos récompenses seront grandes. Restez assidus et le combo augmentera."
                >
                    <ButtonDiamond variant={"secondary"} content={"x 2,4"}></ButtonDiamond>
                </PopoverCustom>
            </div>
        </div>
    )
}

export default CharacterPanel;