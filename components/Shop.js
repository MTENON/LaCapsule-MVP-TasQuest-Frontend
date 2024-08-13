import styles from "../styles/Shop.module.css"

import { useSelector } from "react-redux"

//Importation d'atomes
import Money from "../components/atoms/Money"
import ItemShop from "./molecules/ItemShop";

//Importation de molécule
import ItemInventory from "./atoms/ItemInventory";
import TitleAtoms from "./atoms/TitleAtoms";


const inventory = require('../assets/inventory.json')


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
                    <ItemShop />
                    <ItemShop />
                    <ItemShop />
                    <ItemShop />
                    <ItemShop />
                    <ItemShop />
                </div>
            </div>
        </div>


    )
}

export default Shop;