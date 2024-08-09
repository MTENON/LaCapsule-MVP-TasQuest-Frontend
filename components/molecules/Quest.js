import styles from "../../styles/molecules/Quest.module.css"

//Imports de composants
import Money from "../atoms/Money"
import XPContainer from "../atoms/XPContainer"
import Difficulty from "../atoms/Difficulty"
import Button from "../atoms/Button"

function handleAddQuest() {

}

export default function Quest() {

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
                    <h2 className={styles.titleText}>Titre de la quête</h2>
                </div>
                <div className={styles.titleCardData}>
                    <Money
                        pieces={100}
                    />
                    <XPContainer
                        points={50}
                    />
                    <Difficulty
                        points={3}
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