import styles from "../styles/Shop.module.css"

//Importation d'atomes
import Money from "../components/atoms/Money"
import ItemShop from "./molecules/ItemShop";

//Importation de molécule
import ItemInventory from "./atoms/ItemInventory";


import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'



//backend
const link = process.env.backLink;

function Shop(){

    const [item, setItem] = useState([]);//Un map ne marche que sur un tableau 
    const token = useSelector((state) => {state.user.token})

    useEffect(() => {
        fetch(`${link}/items`, {//On part rechercher dans la BDD ?
            method: "GET",
            headers:
                    {
                        "Authorization": token,
                        "content-type": "application/json"
                    }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setItem(data.data)
        });

    // (async () => {
    //     console.log(token)

    //     const fetchData = await fetch(`${link}/items`, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': token,
    //             'content-type': 'application/json'
    //         }
    //     });
    //     console.log(fetchData.json())
    //     const data = await fetchData.json()
    // })()


    }, [])


    //On va maper les items
    const itemShop = item.map((data, i) => {
        return <ItemShop key={i} name={data.name} icon={data.icon} type={data.type} price={data.price} description={data.description}/>
    });


    return (
        <div className={styles.container}>                    {/* La page entière */}
            <div className={styles.divShopButton}>            {/* Haut de la page */}
                <button className={styles.shopButton}>Boutique</button>
            </div>

            <div className={styles.divBottom}>                 {/* Bas de la page */}
                <div className={styles.divInventory}>               {/* Partie gauche du bas de la page*/}
                    <Money />
                    <button className={styles.inventoryButton}>Inventaire</button>
                    <div className={styles.stuff}>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>
                                <ItemInventory/>    
                    </div>    
                </div>


                <div className={styles.itemSelectionShop}>     {/* Partie droite du bas de la page*/}
                        {itemShop}
                        {/* <ItemShop/>
                        <ItemShop/>
                        <ItemShop/>
                        <ItemShop/>
                        <ItemShop/>
                        <ItemShop/> */}
                </div>
            </div>
        </div>

            
    )
}

export default Shop;