import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/quests.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

//Import de composants
import QuestChoice from "../components/organisms/QuestChoice";
import QuestDisplay from "../components/organisms/QuestDisplay";

function QuestsPage() {

    const [questId, setQuestId] = useState(useSelector((state) => state.user.questId))


    function handleQuestChange(value) {
        setQuestId(value)
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
