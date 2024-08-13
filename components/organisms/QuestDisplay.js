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
import PopoverCustom from "../molecules/PopoverCustom";

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

    // --- Items map --- //

    //Fake data items
    const items = [
        {
            src: '/potions/potion_de_soin.png',
            alt: 'potion_de_soin',
            name: "Potion de soin",
            description: "Cette potion rend 10 PV à l'utilisation. Elle à un gout de cerise."
        },
        {
            src: '/epee.jpg',
            alt: 'epee',
            name: "Epee enchantee",
            description: "Ca tranche et c'est magique. Globalement on apprécie cette efficacité."

        },
    ]

    const item = items.map((e, i) => {
        return (
            <div key={i} className={styles.item}>
                <PopoverCustom
                    message={e.description}
                >
                    <img
                        src={e.src.trim()}
                        alt={e.alt}
                        height={75}
                        width={75}
                        style={{ borderRadius: '15px' }}
                    ></img>
                </PopoverCustom>
                <p>{e.name}</p>
            </div>
        )
    })

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
                        {item}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestDisplay;