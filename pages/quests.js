import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/quest.module.css"

//Import de composants
import Quest from "../components/molecules/Quest";

function QuestsPage() {



    return (
        <Layout>
            <div className={styles.pageContainer}>
                <div className={styles.titleCard}>
                    <h1 style={{ color: '#FCD757' }}>Choix d'une quête</h1>
                </div>
                <div className={styles.questCard}>
                    <Quest></Quest>
                </div>
            </div>
        </Layout>
    );
}

export default QuestsPage;
