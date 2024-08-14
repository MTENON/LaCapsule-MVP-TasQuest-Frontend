import styles from "../styles/Shop.module.css"

import { useSelector } from "react-redux"

//Importation d'atomes
import Money from "../components/atoms/Money"
import ItemShop from "./molecules/ItemShop";

//Importation de molécule
import ItemInventory from "./atoms/ItemInventory";
import TitleAtoms from "./atoms/TitleAtoms";

//import fake data
const inventory = require('../assets/inventory.json')
const shopItems = require('../assets/shopItems.json')


function Shop() {

    const money = useSelector((state) => state.user.money)

    const item = inventory.map((data, i) => {
        return (
            <ItemInventory
                key={i}
                icon={data.icon}
                message={data.name}
            />
        )
    })

    const shop = shopItems.map((data, i) => {

        return (
            <ItemShop
                name={data.name}
                icon={data.icon.trim()}
                price={data.price}
                description={data.description}
            />
        )
    })

    return (
        <div className={styles.container}>

            <TitleAtoms
                title={"Boutique"}
                width={'70%'}
            />

            <div className={styles.divBottom}>                 {/* Bas de la page */}
                <div className={styles.divInventory}>

                    <Money
                        pieces={money}
                    />

                    <div className={styles.inventoryTitle}>
                        <TitleAtoms
                            title={"Inventaire"}
                            width={'70%'}
                        />
                    </div>

                    <div className={styles.stuff}>
                        {item}
                    </div>

                </div>


                <div className={styles.itemSelectionShop}>
                    {shop}
                </div>
            </div>
        </div>


    )
}

export default Shop;