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
const fakeData = require("../assets/shopItems.json")

function Shop(){

    const [item, setItem] = useState(fakeData); 
    // console.log(item);
    
    // const [item, setItem] = useState([]);//Un map ne marche que sur un tableau 
    const token = useSelector((state) => state.user.token)


    useEffect(() => {
        token && fetch(`${link}/items`, {
            method: "GET",
            headers:
                    {
                        "Authorization": token,
                        "content-type": "application/json"
                    }
        })
        .then((response) => response.json())
        .then((data) => {
            setItem(data.data)
        });

    }, [token])//Re-éxecute useEffect à chaque changement de token
    //par rapport au token que tu reçois, tu enverras toutes les infos du useEffect.


    //On va maper les items
    const itemShop = item.map((data, i) => {
        return <ItemShop key={i} name={data.name} icon={data.icon} type={data.type} price={data.price} description={data.description}/>
    });

    //On va maper l'inventaire
    const itemInventory = item.map((data, i) => {
        return <ItemInventory key={i} name={data.name} icon={data.icon} type={data.type} price={data.price} description={data.description}/>
    });

    return (
        <div className={styles.container}>                    {/* La page entière */}
            <div className={styles.divShopButton}>            {/* Haut de la page */}
                <button className={styles.shopButton}>Boutique</button>
            </div>

            <div className={styles.divBottom}>                 {/* Bas de la page */}
                <div className={styles.divInventory}>               {/* Partie gauche du bas de la page*/}
                    <Money pieces="120"/>
                    <button className={styles.inventoryButton}>Inventaire</button>
                    <div className={styles.inventoryContain}>
                        {itemInventory}                             {/* Mapage de l'inventaire*/}
                    </div>    
                </div>


                <div className={styles.itemSelectionShop}>     {/* Partie droite du bas de la page*/}
                        {itemShop}                             {/* Mapage de la boutique*/}
                        
                </div>
            </div>
        </div>

            
    )
}

export default Shop;