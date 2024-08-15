import { useState, useEffect } from "react";
import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";
import Tasks from "../components/organisms/Tasks";
import Todos from "../components/organisms/Todos";
import styles from "../styles/pages/tasks.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function TasksPage() {
    // État pour gérer la tâche sélectionnée
    const [selectedTask, setSelectedTask] = useState(null);
    // État pour forcer la mise à jour du composant
    const [forceUpdate, setForceUpdate] = useState(false);
    // Récupération des données utilisateur depuis le store Redux
    const data = useSelector((state) => state.user);
    console.log(data);

    // Fonction pour gérer la sélection d'une tâche
    const handleTaskSelection = (task) => {
        console.log("Tâche sélectionnée :", task);
        setSelectedTask(task);
    };

    // Fonction pour forcer la mise à jour des composants dépendants
    const handleUpdate = () => {
        setForceUpdate(!forceUpdate);
    };

    // Si vous avez besoin de rediriger l'utilisateur en fonction du token, décommentez et ajustez ce code :
    /*
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
    */

    return (
        <Layout>
            <div className={styles.content}>
                <TitleAtoms title="Les tâches" />
                <div className={styles.container}>
                    <Tasks
                        onSelectTask={handleTaskSelection} // Prop pour sélectionner une tâche
                        onUpdate={handleUpdate} // Prop pour mettre à jour la liste des tâches
                    />
                    <Todos
                        task={selectedTask}
                        forceUpdate={forceUpdate} // Prop pour forcer la mise à jour de `Todos`
                    />
                </div>
            </div>
        </Layout>
    );
}

export default TasksPage;
