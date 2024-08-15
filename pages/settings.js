import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/settings.module.css"

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../reducers/users";

//Import de composants
import TextInputs from "../components/atoms/TextInputs"
import ButtonLarge from "../components/atoms/ButtonLarge"

const link = process.env.backLink;

function SettingsPage() {

    const dispatch = useDispatch();

    const patternUsername = /^[a-zA-Z0-9]{4,10}$/g;
    const patternPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const username = useSelector((state) => state.user.username)
    const characterName = useSelector((state) => state.user.characterName)
    const [email, setEmail] = useState("")

    //Initialisation des états
    const [usernameForm, setUsernameForm] = useState("");
    const [usernamePassword, setUsernamePassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)

    const [characterNameForm, setCharacterNameForm] = useState("");
    const [characterNamePassword, setCharacterNamePassword] = useState("")
    const [characterNameError, setCharacterNameError] = useState(false)

    const [emailForm, setEmailForm] = useState("");
    const [emailPassword, setEmailPassword] = useState("")
    const [emailError, setEmailError] = useState(false)

    const [oldPassword, setOldPassword] = useState("")
    const [passwordForm, setPasswordForm] = useState("");
    const [passwordConfirmForm, setPasswordConfirmForm] = useState("");
    const [passwordError, setPasswordError] = useState(false)

    //useEffect pour gérer les pattern
    useEffect(() => {

        //Récupération de l'email
        (async () => {
            const fetchData = await fetch(`${link}/parameters/userMail`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ token })
            });
            const data = await fetchData.json()

            if (data.result) {
                setEmail(data.data)
            }
        })();

        if (!patternUsername.test(usernameForm)) {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }

        if (!patternEmail.test(emailForm)) {
            setEmailError(true);
        } else {
            setEmailError(false)
        }

        if (!patternUsername.test(characterNameForm)) {
            setCharacterNameError(true)
        } else {
            setCharacterNameError(false)
        }

        if (!patternPassword.test(passwordForm) && !patternPassword.test(passwordConfirmForm) && passwordForm !== passwordConfirmForm && passwordForm === oldPassword && passwordConfirmForm === oldPassword) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }, [usernameForm, characterNameForm, emailForm, passwordForm, passwordConfirmForm])

    //reducer
    const token = useSelector((state) => state.user.token)

    //Fonctions
    async function handleChangeUsername() {

        if (patternUsername.test(usernameForm)) {
            const fetchData = await fetch(`${link}/parameters/username`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ token: token, newUsername: usernameForm, password: usernamePassword })
            })

            const data = await fetchData.json();

            if (!data.result) {
                window.alert('Un problème est survenu.')
                console.log(data);
                setUsernameForm("");
                setUsernamePassword("");
            } else {
                dispatch(updateUsername(usernameForm))
                window.alert("Votre nom d'utilisateur à changé.")
                setUsernameForm("");
                setUsernamePassword("");
            }

        }

    }

    async function handleChangeCharacterName() {

        if (patternUsername.test(characterNameForm)) {
            const fetchData = await fetch(`${link}/parameters/characterName`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ token: token, newCharacterName: characterNameForm, password: characterNamePassword })
            })

            const data = await fetchData.json();

            if (!data.result) {
                window.alert('Un problème est survenu.');
                console.log(data);
                setCharacterNameForm("");
                setCharacterNamePassword("");
            } else {
                window.alert('Le nom de votre personnage à été changé.')
                setCharacterNameForm("");
                setCharacterNamePassword("");
            }

        }

    }

    async function handleChangeEmail() {

        if (patternEmail.test(emailForm)) {
            const fetchData = await fetch(`${link}/parameters/email`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ token: token, newEmail: emailForm, password: emailPassword })
            })

            const data = await fetchData.json();

            if (!data.result) {
                window.alert('Un problème est survenu.');
                console.log(data);
                setEmailForm("");
                setEmailPassword("");
            } else {
                window.alert('Votre email est changé.')
                setEmailForm("");
                setEmailPassword("");
            }

        }

    }

    async function handleChangePassword() {
        if (patternPassword.test(passwordForm) && patternPassword.test(passwordConfirmForm) && passwordForm === passwordConfirmForm && passwordForm !== oldPassword && passwordConfirmForm !== oldPassword) {
            const fetchData = await fetch(`${link}/parameters/password`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ token: token, newPassword: passwordForm, password: oldPassword })
            })

            const data = await fetchData.json();

            if (!data.result) {
                window.alert('Un problème est survenu.')
                setPasswordForm("");
                console.log(data);
                setPasswordConfirmForm("");
                setOldPassword("")
            } else {
                window.alert('Votre mot de passe à changé.')
                setPasswordForm("");
                setPasswordConfirmForm("");
                setOldPassword("")
            }

        }

    }

    return (
        <Layout>
            <h1>Paramètres</h1>
            <div className={styles.card}>
                <h2>Changer le nom d'utilisateur</h2>
                <p>Mon nom d'utilisateur: {username}</p>
                <TextInputs
                    value={usernameForm}
                    type="text"
                    onChange={(e) => setUsernameForm(e.target.value)}
                    placeholder="new username"
                    width={"50%"}
                    variant="primaryAll"
                />
                {usernameError && <p style={{ color: "#A50104" }}>Votre nom de compte ne doit pas comporter de symboles spéciaux ni d'espaces.</p>}
                <h3>Mot de passe</h3>
                <TextInputs
                    value={usernamePassword}
                    type="password"
                    onChange={(e) => setUsernamePassword(e.target.value)}
                    placeholder="password"
                    width={"50%"}
                    variant="secondaryAll"
                />
                <div style={{ marginTop: "3%" }}>
                    <ButtonLarge
                        variant={"primary"}
                        onClick={() => handleChangeUsername()}
                    >Changer le nom d'utilisateur</ButtonLarge>
                </div>

            </div>

            <div className={styles.card}>
                <h2>Changer le nom de votre personnage</h2>
                <p>Mon nom de personnage: {characterName}</p>
                <TextInputs
                    value={characterNameForm}
                    type="text"
                    onChange={(e) => setCharacterNameForm(e.target.value)}
                    placeholder="character name"
                    width={"50%"}
                    variant="primaryAll"
                />
                {characterNameError && <p style={{ color: "#A50104" }}>Votre nom de personnage ne doit pas comporter de symboles spéciaux ni d'espaces.</p>}
                <h3>Mot de passe</h3>
                <TextInputs
                    value={characterNamePassword}
                    type="password"
                    onChange={(e) => setCharacterNamePassword(e.target.value)}
                    placeholder="password"
                    width={"50%"}
                    variant="secondaryAll"
                />
                <div style={{ marginTop: "3%" }}>
                    <ButtonLarge
                        variant={"primary"}
                        onClick={() => handleChangeCharacterName()}
                    >Changer le nom du personnage</ButtonLarge>
                </div>

            </div>

            <div className={styles.card}>
                <h2>Changer l'email</h2>
                <p>Mon email: {email}</p>
                <TextInputs
                    value={emailForm}
                    type="text"
                    onChange={(e) => setEmailForm(e.target.value)}
                    placeholder="email"
                    width={"50%"}
                    variant="primaryAll"
                />
                {emailError && <p style={{ color: "#A50104" }}>Votre email doit être correct.</p>}
                <h3>Mot de passe</h3>
                <TextInputs
                    value={emailPassword}
                    type="password"
                    onChange={(e) => setEmailPassword(e.target.value)}
                    placeholder="password"
                    width={"50%"}
                    variant="secondaryAll"
                />
                <div style={{ marginTop: "3%" }}>
                    <ButtonLarge
                        variant={"primary"}
                        onClick={() => handleChangeEmail()}
                    >Changer l'email</ButtonLarge>
                </div>

            </div>

            <div className={styles.card}>
                <h2>Changer votre mot de passe</h2>
                <h3>Mot de passe actuel</h3>
                <TextInputs
                    value={oldPassword}
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="actual password"
                    width={"50%"}
                    variant="secondaryAll"
                />
                {passwordError && <p style={{ color: "#A50104" }}>Vos mots de passe doivent correspondre, être différents de l'ancien et comporter une majuscule, un chiffre et un symbole au minimum.</p>}
                <h3>Nouveau mot de passe</h3>
                <TextInputs
                    value={passwordForm}
                    type="password"
                    onChange={(e) => setPasswordForm(e.target.value)}
                    placeholder="new password"
                    width={"50%"}
                    variant="primaryAll"
                />
                <h3>Confirmer le nouveau mot de passe</h3>
                <TextInputs
                    value={passwordConfirmForm}
                    type="password"
                    onChange={(e) => setPasswordConfirmForm(e.target.value)}
                    placeholder="confirm new password"
                    width={"50%"}
                    variant="primaryAll"
                />
                <div style={{ marginTop: "3%" }}>
                    <ButtonLarge
                        variant={"primary"}
                        onClick={() => handleChangePassword()}
                    >Changer le mot de passe</ButtonLarge>
                </div>

                {/* DESTRUCTION DU COMPTE */}

            </div>
        </Layout>
    );
}

export default SettingsPage;
