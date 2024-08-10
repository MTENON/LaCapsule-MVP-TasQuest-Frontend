import styles from "../../styles/pages/quests.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Import de composants
import Quest from "../../components/molecules/Quest";

const link = process.env.backLink

function QuestChoice({ handleQuestChange }) {

    const [questList, setQuestList] = useState([])

    const token = useSelector((state) => state.user.token)

    function change(value) {
        handleQuestChange(value)
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
            />)

    })

    useEffect(() => {


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


    }, [])

    return (
        <>
            <div className={styles.titleCard}>
                <h1 style={{ color: '#FCD757' }}>Choix d'une quête</h1>
            </div>
            <div className={styles.questCard}>
                {quest}
            </div>
        </>
    )
}

export default QuestChoice;