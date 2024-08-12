import styles from "../../styles/molecules/Quest.module.css"

import { useSelector, useDispatch } from 'react-redux'

//Imports de composants
import Money from "../atoms/Money"
import XPContainer from "../atoms/XPContainer"
import Difficulty from "../atoms/Difficulty"
import Button from "../atoms/Button"
import { updateQuestId } from "../../reducers/users"

export default function Quest({ id, title, money, XP, difficulty, change, creator }) {

    const dispatch = useDispatch();

    async function handleAddQuest() { //En appuyant sur le bouton + de la quête

        dispatch(updateQuestId(id)); //Mise à jour du reducer
        change(id);

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
                    <div className={styles.titleInfo}>
                        <h2 className={styles.titleText}>{title}</h2>
                        {creator && <h2 className={styles.playerText}>Rejoindre {creator}</h2>}
                    </div>
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