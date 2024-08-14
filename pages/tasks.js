import { useState } from "react";
import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";
import Tasks from "../components/organisms/Tasks";
import Todos from "../components/organisms/Todos";
import styles from "../styles/pages/tasks.module.css";

function TasksPage() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(false);

    const handleTaskSelection = (task) => {
        console.log("Tâche sélectionnée :", task);
        setSelectedTask(task);
    };

    const handleUpdate = () => {
        setForceUpdate(!forceUpdate);
    };

    return (
        <>
            <Layout>
                <div className={styles.content}>
                    <TitleAtoms title="Les taches"></TitleAtoms>
                    <div className={styles.container}>
                        <Tasks
                            onSelectTask={handleTaskSelection}
                            onUpdate={handleUpdate}
                        />
                        <Todos task={selectedTask} forceUpdate={forceUpdate} />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default TasksPage;
