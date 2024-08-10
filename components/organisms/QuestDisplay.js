import styles from "../../styles/pages/quests.module.css"

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestId } from "../../reducers/users";

//Import de composants
import Button from "../atoms/Button"
import Healthbar from "../atoms/Healthbar"

const link = process.env.backLink

function QuestDisplay({ handleQuestDisplay }) {

    const [questTitle, setQuestTitle] = useState('Titre de la quête')
    const [questDesc, setQuestDesc] = useState('Description de la quête')
    const [quest, setQuest] = useState({})

    let questId = useSelector((state) => state.user.questId)
    const token = useSelector((state) => state.user.token)

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const fetchData = await fetch(`${link}/quests/${questId}`, {
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

    function cancel() {
        dispatch(updateQuestId(""))
        handleQuestDisplay()
    }

    return (
        <div className={styles.questDisplayContainer}>
            <div className={styles.questDisplayUp}>
                <div className={styles.questIntel}>
                    <div className={styles.titleCardQuest}>
                        <h1 style={{ color: '#FCD757' }}>{quest.name}</h1>
                    </div>
                    <p>{quest.description}</p>
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
                <div className={styles.logCard}></div>
            </div>
            <Button
                variant={'primary'}
                icon={"icomoon-free:cross"}
                func={cancel}
            />
        </div>
    )
}

export default QuestDisplay;