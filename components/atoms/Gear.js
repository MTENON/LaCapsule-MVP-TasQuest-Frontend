import styles from '../../styles/atoms/Gear.module.css'

import PopoverCustom from '../molecules/PopoverCustom'

function Gear({ name, icon, message }) {


    return (
        // <div className={styles.gearContainer}>

        <PopoverCustom
            message={message}
            className={styles.popup}
        >

            <h4 className={styles.text}>{name}</h4>

            <div className={styles.background}>
                <img
                    src={icon}
                    height={'100%'}
                    width={'100%'}
                    alt={icon}
                    onError={({ currentTarget }) => currentTarget.src = '/default.png'}
                ></img>
            </div>
        </PopoverCustom>

        // </div>
    )
}

export default Gear