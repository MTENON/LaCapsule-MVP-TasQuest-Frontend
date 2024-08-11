import styles from "../../styles/pages/quests.module.css"

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestId } from "../../reducers/users";

//Import de composants
import Button from "../atoms/Button"
import Healthbar from "../atoms/Healthbar"
import ChatBox from "./ChatBox";

const link = process.env.backLink

function QuestDisplay({ handleQuestDisplay }) {

    const [quest, setQuest] = useState({})

    let questId = useSelector((state) => state.user.questId)
    const characterId = useSelector((state) => state.user.characterId)
    const token = useSelector((state) => state.user.token)

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const fetchData = await fetch(`${link}/quests/getById/${questId}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            const questData = await fetchData.json()

            setQuest(questData.data)
        })()
    }, [])

    async function cancel() {
        dispatch(updateQuestId(null));
        handleQuestDisplay();
        await fetch(`${link}/quests/stopQuest`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ characterId: characterId })
        })
    }

    return (
        <div className={styles.questDisplayContainer}>
            <div className={styles.questDisplayUp}>
                <div className={styles.questIntel}>
                    <div className={styles.titleCardQuest}>
                        <h1 style={{ color: '#FCD757' }}>{quest.name}</h1>
                    </div>
                    <p className={styles.titleCardDesc}>{quest.description}</p>
                </div>
                <div className={styles.monsterIntel}>
                    <img src='https://placehold.co/100'></img>
                    <Healthbar
                        health={50}
                        maxHealth={50}
                    />
                </div>
            </div>
            <div className={styles.questDisplayDown}>
                <div className={styles.logButton}>
                    <div className={styles.logCard} >
                        <ChatBox></ChatBox>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            variant={'primary'}
                            icon={"icomoon-free:cross"}
                            func={cancel}
                        />
                    </div>
                </div>
                <div className={styles.questLoot}>
                    <h2 style={{ color: '#A50104' }}>Récompenses</h2>
                </div>
            </div>

        </div >
    )
}

export default QuestDisplay;