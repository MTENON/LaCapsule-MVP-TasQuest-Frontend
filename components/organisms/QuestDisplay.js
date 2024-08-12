import styles from "../../styles/pages/quests.module.css"

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestId } from "../../reducers/users";

//Import de composants
import Button from "../atoms/Button"
import Healthbar from "../atoms/Healthbar"
import ChatBox from "./ChatBox";
import Money from '../atoms/Money'
import XPContainer from '../atoms/XPContainer'

const link = process.env.backLink

function QuestDisplay({ handleQuestDisplay }) {

    const [quest, setQuest] = useState({})

    let questId = useSelector((state) => state.user.questId)
    const characterId = useSelector((state) => state.user.characterId)
    const token = useSelector((state) => state.user.token)
    const roomId = useSelector((state) => state.user.roomId)

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
            body: JSON.stringify({ characterId: characterId },)
        })

        await fetch(`${link}/quests/room/${roomId}/leaveRoom`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        )
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
                    <img src='/monstre.jpg'
                        alt='monstre'
                        height={150}
                        width={150}
                        style={{ borderRadius: '15px' }}
                    ></img>
                    <Healthbar
                        health={50}
                        maxHealth={50}
                    />
                </div>
            </div>
            <div className={styles.questDisplayDown}>
                <div className={styles.logButton}>
                    <div className={styles.logCard} >
                        <ChatBox roomId={roomId}></ChatBox>
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
                    <div className={styles.rewards}>
                        <Money pieces={25} />
                        <XPContainer points={50} />
                    </div>
                    <div className={styles.items}>
                        <h2 style={{ color: '#A50104' }}>Objets</h2>
                        <div className={styles.item}>
                            <img
                                src='/potion_de_soin.jpg'
                                alt='potion_de_soin'
                                height={75}
                                width={75}
                                style={{ borderRadius: '15px' }}
                            ></img>
                            <p>Potion de soin</p>
                        </div>
                        <div className={styles.item}>
                            <img
                                src='/epee.jpg'
                                alt='epee'
                                height={75}
                                width={75}
                                style={{ borderRadius: '15px' }}
                            ></img>
                            <p>Epee enchantee</p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default QuestDisplay;