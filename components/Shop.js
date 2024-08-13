import styles from "../styles/Shop.module.css"

//Importation d'atomes
import Money from "../components/atoms/Money"
import ItemShop from "./molecules/ItemShop";

//Importation de molécule
import ItemInventory from "./atoms/ItemInventory";
import TitleAtoms from "./atoms/TitleAtoms";


const inventory = require('../assets/inventory.json')


function Shop() {

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
                <div className={styles.divInventory}>               {/* Partie gauche du bas de la page*/}
                    <Money />
                    <TitleAtoms
                        title={"Inventaire"}
                        width={'70%'}
                        className={styles.inventoryTitle}
                    />
                    <div className={styles.stuff}>
                        {item}
                    </div>
                </div>


                <div className={styles.itemSelectionShop}>     {/* Partie droite du bas de la page*/}
                    {/* {itemShop} */}
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