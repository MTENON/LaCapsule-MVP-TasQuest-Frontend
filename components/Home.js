import styles from "../styles/Home.module.css";

import { useState } from "react";

//Import reducer user fonctions
import { useDispatch } from "react-redux"
import { updateUsername, updateToken } from "../reducers/users";

//Components import
import TextInputs from "./atoms/TextInputs";
import NewAccountModal from "./organisms/NewAccountModal";

const link = process.env.backLink

function Home() {

    //Declaration du dispatch
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    //form handle states
    const [newUserForm, setNewUserForm] = useState([])

    // --- functions --- //

    // CONNECTION A UN COMPTE DEJA EXISTANT
    async function handleConnection() {
        const fetchData = await fetch(`${link}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const userData = await fetchData.json();
        if (userData.result === false) {
            setError(true);
        } else {
            setError(false)
            dispatch(updateUsername(userData.data.username))
            dispatch(updateToken(userData.data.token))
            window.location.href = 'tasks'
        }
    }

    return (
        <main className={styles.main}>

            <div className={styles.leftDiv}></div>

            <div className={styles.rightDiv}>

                <h1 style={{ color: '#F5F5F5' }}>TAS'QUEST</h1>

                <h2 style={{ color: '#FCD757' }}>Nom d'utilisateur</h2>

                <TextInputs
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    width={300}
                    variant="secondaryBottom"
                ></TextInputs>

                <h2 style={{ color: '#FCD757' }}>Mot de passe</h2>

                <TextInputs
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    width={300}
                    variant="secondaryBottom"
                ></TextInputs>

                {error && <h4 style={{ color: '#FCD757' }}>Wrong username, email or password</h4>}

                <button onClick={() => handleConnection()}>Connexion</button>

                <p style={{ color: '#F5F5F5' }}>Nouvel utilisateur?</p>

                <NewAccountModal></NewAccountModal>
            </div>


        </main>
    );
}

export default Home;
