import styles from "../styles/Home.module.css";
import TextInputs from "./atoms/TextInputs";
import { useState } from "react";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // --- functions --- //
    function handleSubmit() { }

    function handleJoinUs() { }

    return (
        <main className={styles.main}>
            <div className={styles.leftDiv}></div>
            <div className={styles.rightDiv}>
                <h1>TAS'QUEST</h1>
                <h2>Nom d'utilisateur</h2>
                <TextInputs
                    value={'Test'}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    width={300}
                    variant="secondaryBottom"
                ></TextInputs>
                <h2>Mot de passe</h2>
                <TextInputs
                    value={'Test'}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    width={300}
                    variant="secondaryBottom"
                ></TextInputs>
                <button onClick={() => handleSubmit()}>Connexion</button>
                <p style={{ color: '#F5F5F5' }}>Nouvel utilisateur?</p>
                <button onClick={() => handleJoinUs()}>Rejoins nous!</button>
            </div>


        </main>
    );
}

export default Home;
