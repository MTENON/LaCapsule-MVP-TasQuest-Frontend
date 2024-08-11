import styles from '../../styles/organisms/ChatBox.module.css'

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import TextInputs from '../../components/atoms/TextInputs';

const link = process.env.backLink

// --- SOCKET.IO --- //
import socketIOClient from 'socket.io-client'
const { io } = require('socket.io-client')


function ChatBox() {

    const [socket, setSocket] = useState('');
    const [username, setUsername] = useState(useSelector((state) => state.user.username))
    const [message, setMessage] = useState('');
    const [messagerie, setMessagerie] = useState([]);
    const [roomJoined, setRoomJoined] = useState(false);
    const [roomId, setRoomId] = useState(useSelector((state) => state.user.quest));


    useEffect(() => {

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
        }

        setRoomJoined(true);
        socket.emit('join room', (roomId));

        return () => {
            socket.off("connect"); // Débranche l'écoute du socket "connect"
            socket.disconnect(); // Déconnecte le socket du serveur
        };

    }, [])


    const showMessage = messagerie.map((data, i) => {

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
                    <div key={i} className={styles.otherMessage}>
                        <h4>{data.user}</h4>
                        <p>{data.content}</p>
                    </div>
                </div>
            )
        }

    })

    function handleSend() {
        // setMessagerie([...messagerie, { user: username, content: message }]);
        socket.emit("message", { user: username, content: message })
        setMessage('')
    }

    function handleSendToRoom() {
        socket.emit('room message', { room: roomId, user: username, content: message });
        setMessage('')
    }

    function joinOrLeaveRoom() {
        if (!roomJoined) {
            setRoomJoined(true);
            socket.emit('join room', (roomId));
        } else {
            setRoomJoined(false);
            socket.emit('leave room', (roomId));
        }
    }

    return (
        <div className={styles.chatContainer}>

            <div className={styles.userInfo}>
                <input
                    value={roomId}
                    style={{ height: '50px', width: '100px' }}
                    placeholder='Room'
                    onChange={(e) => { setRoomId(e.target.value) }}
                ></input>
                <button onClick={() => {
                    joinOrLeaveRoom()
                }}
                    style={roomJoined ? { backgroundColor: "green" } : {}}
                >Join room '{roomId}'</button>
                <div className={styles.userInfoDisplay}>
                    <p>Your username: {username}</p>
                </div>
            </div>
            <div className={styles.chatCard}>
                {showMessage}
            </div>
            <div className={styles.inputCard}>
                <TextInputs
                    value={message}
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="placeholder"
                    width={1000}
                    variant="secondaryAll"
                />
                <button onClick={() => handleSendToRoom()}>SEND TO ROOM</button>
            </div>
        </div>
    )

}

export default ChatBox;