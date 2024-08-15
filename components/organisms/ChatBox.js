import styles from '../../styles/organisms/ChatBox.module.css'
import loading from '../../styles/atoms/loader.module.css'

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import TextInputs from '../../components/atoms/TextInputs';

const link = process.env.backLink

// --- SOCKET.IO --- //
import socketIOClient from 'socket.io-client'
const { io } = require('socket.io-client')

//Import de composants
import Button from '../atoms/Button';


function ChatBox({ }) { //roomId à placer en props pour récupérer l'id de la room et l'intégrer dans le chat

    const [socket, setSocket] = useState('');
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [otherUserIsWriting, setOtherUserIsWriting] = useState(false);
    const [otherUser, setOtherUser] = useState("")
    const [messagerie, setMessagerie] = useState( //FAUSSE DATA POUR MESSAGERIE DEMODAY
        [
            {
                user: "maxime",
                content: "Hey salut les copain!"
            },
            {
                user: "angelique",
                content: "Coucou!"
            },
            {
                user: "maryam",
                content: "Bon je suis prête à faire mes tâches"
            },
            {
                user: "alpha",
                content: "go faire notre MVP!"
            },
        ]
    );
    const [roomJoined, setRoomJoined] = useState(false);

    const username = useSelector((state) => state.user.username);
    const token = useSelector((state) => state.user.token);
    const roomId = 100; //fake room Id pour demoday

    // console.log(roomId)

    useEffect(() => {

        //Récupération des messages sauvegardés

        // (async () => {
        //     const messagesFetchData = await fetch(`${link}/quests/room/${roomId}/getMessages`, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': token,
        //             'Content-Type': 'application/json'
        //         },
        //     })
        //     const messages = await messagesFetchData.json()
        //     setMessagerie(messages.data)
        // })()

        // --- ------ --- //
        // --- SOKETS --- //
        // --- ------ --- //

        //On peut voir pour placer ces commandes dans une fonction exterieure 'socket connection' pour l'utiliser à divers endroits.
        const socket = socketIOClient(`${link}`);
        setSocket(socket);

        socket.on('message', (data) => {
            console.log("received", data)
            setMessagerie((prevMessages) => [...prevMessages, { user: data.user, content: data.content }])
        });

        if (roomJoined) {
            socket.on('room message', (data) => {
                console.log("received", data)
                setMessagerie((prevMessages) => [...prevMessages, { user: data.user, content: data.content }])
            });
            socket.on('writing', (data) => {
                if (data.user !== username) {
                    setOtherUser(data.user)
                    setOtherUserIsWriting(true);
                    setTimeout(() => {
                        setOtherUserIsWriting(false);
                    }, 4000);
                }

            })
        }

        setRoomJoined(true);
        socket.emit('join room', (roomId));

        return () => {
            socket.off("connect"); // Débranche l'écoute du socket "connect"
            socket.disconnect(); // Déconnecte le socket du serveur
        };

        // --- ---------- --- //
        // --- END SOKETS --- //
        // --- ---------- --- //

    }, [loading])

    let showMessage = [];
    if (messagerie.length > 0) {
        showMessage = messagerie.map((data, i) => {

            let messageStyle = ''
            if (data.user === username) {
                messageStyle = 'myMessage'
            } else {
                messageStyle = 'otherMessage'
            }

            if (messageStyle === 'myMessage') {
                return (
                    <div key={i} className={styles.messageCardmyMessage}>
                        <div className={styles.myMessage}>
                            <h4>{data.user}</h4>
                            <p className={styles.wrapper}>{data.content}</p>
                        </div>
                    </div >
                )
            } else {
                return (
                    <div key={i} className={styles.messageCardotherMessage}>
                        <div className={styles.otherMessage}>
                            <h4>{data.user}</h4>
                            <p className={styles.wrapper}>{data.content}</p>
                        </div>
                    </div>
                )
            }
        })
    }

    // function handleSend() {
    //     // setMessagerie([...messagerie, { user: username, content: message }]);
    //     socket.emit("message", { user: username, content: message })
    //     setMessage('')
    // }

    async function handleSendToRoom() {
        await socket.emit('room message', { room: roomId, user: username, content: message });

        await fetch(`${link}/quests/room/${roomId}/addMessage`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, content: message })
        });

        setMessage('');
    }

    // function joinOrLeaveRoom() {
    //     if (!roomJoined) {
    //         setRoomJoined(true);
    //         socket.emit('join room', (roomId));
    //     } else {
    //         setRoomJoined(false);
    //         socket.emit('leave room', (roomId));
    //     }
    // }

    function handleChange(e) {
        setMessage(e.target.value);
        setLoader(true);
        socket.emit('writing', ({ room: roomId, user: username }))
        setTimeout(() => {
            setLoader(false)
        }, 4000)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.chatContainer}>
                <div className={styles.chatCard}>
                    {showMessage}
                </div>


                {otherUserIsWriting && <p>{otherUser} is wrinting.</p>}
                <div className={styles.inputCard}>
                    {loader && <div className={loading.loader}></div>}
                    <TextInputs
                        value={message}
                        type="text"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        placeholder="placeholder"
                        width={480}
                        variant="secondaryAll"
                    />
                    <div style={{ margin: "0 1%" }}></div>
                    <Button variant={"secondary"} icon={"iconamoon:player-end-fill"} func={handleSendToRoom} />
                </div>
            </div>
            <div className={styles.usersContainer}>
                <div className={styles.userCardTitle}><p>Présents dans le chat</p></div>
                <div className={styles.userCard}><p>maxime</p></div>
                <div className={styles.userCard}><p>angelique</p></div>
                <div className={styles.userCard}><p>maryam</p></div>
                <div className={styles.userCard}><p>alpha</p></div>
            </div>
        </div>
    )

}

export default ChatBox;