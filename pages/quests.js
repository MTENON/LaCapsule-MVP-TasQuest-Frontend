import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/quests.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Import de composants
import QuestChoice from "../components/organisms/QuestChoice";
import QuestDisplay from "../components/organisms/QuestDisplay";
import { updateRoomId } from "../reducers/users";

const link = process.env.backLink

function QuestsPage() {

    const [questId, setQuestId] = useState(useSelector((state) => state.user.questId))
    const token = useSelector((state) => state.user.token)
    const characterId = useSelector((state) => state.user.characterId)

    const dispatch = useDispatch();

    async function handleQuestChange(value) {

        setQuestId(value)

        await fetch(`${link}/quests/newQuest`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ characterId: characterId, questId: value })
        });

        const fetchRoom = await fetch(`${link}/quests/addRoom`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, questId: value })
        });
        const newRoom = await fetchRoom.json();
        console.log(newRoom)
        dispatch(updateRoomId(newRoom.data))

    }

    function handleQuestDisplay() {
        setQuestId('');
    }

    return (
        <Layout>
            <div className={styles.pageContainer}>
                {!questId && <QuestChoice handleQuestChange={handleQuestChange}></QuestChoice>}
                {questId && <QuestDisplay handleQuestDisplay={handleQuestDisplay} />}
            </div>
        </Layout>
    );
}

export default QuestsPage;
