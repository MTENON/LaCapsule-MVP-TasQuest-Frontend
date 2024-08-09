import styles from "../../styles/molecules/Quest.module.css"

import { useSelector } from 'react-redux'

//Imports de composants
import Money from "../atoms/Money"
import XPContainer from "../atoms/XPContainer"
import Difficulty from "../atoms/Difficulty"
import Button from "../atoms/Button"

const link = process.env.backLink

export default function Quest({ key, title, money, XP, difficulty }) {

    const token = useSelector((state) => state.user.token)

    function handleAddQuest() {

    }

    return (
        <div className={styles.questContainer}>
            <div className={styles.picCard}>
                <img
                    className={styles.pic}
                    src='https://placehold.co/90x90'
                    alt='image placeholder'
                ></img>
            </div>
            <div className={styles.titleCard}>
                <div className={styles.title}>
                    <h2 className={styles.titleText}>{title}</h2>
                </div>
                <div className={styles.titleCardData}>
                    <Money
                        pieces={money}
                    />
                    <XPContainer
                        points={XP}
                    />
                    <Difficulty
                        points={difficulty}
                    />
                </div>
            </div>
            <div className={styles.buttonCard}>
                <Button
                    variant={'primary'}
                    icon={"mingcute:cross-fill"}
                    func={handleAddQuest}
                />
            </div>

        </div>
    )
}