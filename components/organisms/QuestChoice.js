import styles from "../../styles/pages/quests.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Import de composants
import Quest from "../../components/molecules/Quest";
import ButtonLarge from "../../components/atoms/ButtonLarge"

const link = process.env.backLink

function QuestChoice({ handleQuestChange }) {

    const [questList, setQuestList] = useState([])
    const [questMulti, setQuestMulti] = useState(false)

    const token = useSelector((state) => state.user.token)

    function change(value) {
        handleQuestChange(value)
    }

    function changeMulti() {
        setQuestMulti(!questMulti)
    }

    const quest = questList.map((data) => {
        return (
            <Quest
                key={data._id}
                id={data._id}
                title={data.name}
                money={data.money}
                XP={data.XP}
                difficulty={data.difficulty}
                change={change}
                creator={data.creator}
            />)

    })

    useEffect(() => {

        if (!questMulti) {
            (async () => {
                const fetchData = await fetch(`${link}/quests/threeQuests`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                })
                const questsData = await fetchData.json()

                setQuestList([questsData.questOne, questsData.questTwo, questsData.questThree])

            })();
        } else {
            (async () => {
                const fetchData = await fetch(`${link}/quests/joinQuest`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                })
                const questQuery = await fetchData.json()

                const newQuest = [];

                for (let i = 0; i < questQuery.data.length; i++) {
                    const fetchQuestData = await fetch(`${link}/quests/getById/${questQuery.data[i].questId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                    const questData = await fetchQuestData.json()
                    newQuest.push({ ...questData.data, creator: questQuery.data[i].creator })
                    // setQuestList((oldQuests) => [oldQuests, newQuest])
                }
                setQuestList(newQuest)

            })()
        }

    }, [questMulti])

    return (
        <>
            <div className={styles.titleCard}>
                <h1 style={{ color: '#FCD757' }}>Choix d'une quête</h1>
            </div>
            <ButtonLarge variant={'secondary'} onClick={changeMulti}>{!questMulti ? 'Quêtes en solo' : "Rejoindre d'autres joueurs"}</ButtonLarge>
            <div className={styles.questCard}>
                {quest}
            </div>
        </>
    )
}

export default QuestChoice;