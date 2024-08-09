import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/quest.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Import de composants
import Quest from "../components/molecules/Quest";

const link = process.env.backLink



function QuestsPage() {

    const [questList, setQuestList] = useState([])

    const token = useSelector((state) => state.user.token)

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

    const quest = questList.map((data) => {
        return (
            <Quest
                key={data._id}
                title={data.name}
                money={data.money}
                XP={data.XP}
                difficulty={data.difficulty}
            />)

    })

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <div className={styles.titleCard}>
                    <h1 style={{ color: '#FCD757' }}>Choix d'une quête</h1>
                </div>
                <div className={styles.questCard}>
                    {quest}
                </div>
            </div>
        </Layout>
    );
}

export default QuestsPage;
