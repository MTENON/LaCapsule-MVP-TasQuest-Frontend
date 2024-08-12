import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";
import Tasks from "../components/organisms/Tasks";
import Todos from "../components/organisms/Todos";
import styles from "../styles/pages/tasks.module.css";

function TasksPage() {
    return (
        <>
            <Layout>
                <div className={styles.content}>
                    <TitleAtoms title="Les taches"></TitleAtoms>
                    <div className={styles.container}>
                        <Tasks></Tasks>
                        <Todos></Todos>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default TasksPage;
