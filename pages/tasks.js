import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function TasksPage() {

    const username = useSelector((state) => state.user)
    console.log(username);

    const token = useSelector((state) => state.user.token)
    const characterId = useSelector((state) => state.user.characterId)
    const money = useSelector((state) => state.user.money)
    const HP = useSelector((state) => state.user.HP)
    const XP = useSelector((state) => state.user.XP)
    const caracs = useSelector((state) => state.user.caracs['0'])


    return (
        <>
            <h1>Page taches</h1>
            {/* <p>{username}</p> */}
            <p>{token}</p>
            <p>{characterId}</p>
            <p>{money}</p>
            <p>{HP}</p>
            <p>{XP}</p>
            <p>{caracs}</p>
        </>
    );
}

export default TasksPage;
