import { useState } from "react";
import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";
import Tasks from "../components/organisms/Tasks";
import Todos from "../components/organisms/Todos";
import styles from "../styles/pages/tasks.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function TasksPage() {
    const test = useSelector((state) => state.user.token);

    const router = useRouter();
    useEffect(() => {
        try {
            const storedData = localStorage.getItem("persist:tokenify");
            const parsedData = JSON.parse(JSON.parse(storedData).user).value;
            const token = parsedData.token;
            console.log("parsedStoredData", token);

            if (token) {
                console.log(token);
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    }, [router]);

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
                    <TitleAtoms title="Les tâches"></TitleAtoms>
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
