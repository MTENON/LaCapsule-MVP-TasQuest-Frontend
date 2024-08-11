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
                player={data.creator}
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
                setQuestList([])
                const questQuery = await fetchData.json()
                await questQuery.data.forEach(async (e) => {
                    const fetchQuestData = await fetch(`${link}/quests/getById/${e.questId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                    const questData = await fetchQuestData.json()
                    setQuestList([questData.data])
                })
            })()
        }

    }, [questMulti])

    return (
        <>
            <div className={styles.titleCard}>
                <h1 style={{ color: '#FCD757' }}>Choix d'une quête</h1>
            </div>
            <ButtonLarge variant={'secondary'} onClick={changeMulti}>{!questMulti ? 'Multijoueur' : 'Solo'}</ButtonLarge>
            <div className={styles.questCard}>
                {quest}
            </div>
        </>
    )
}

export default QuestChoice;