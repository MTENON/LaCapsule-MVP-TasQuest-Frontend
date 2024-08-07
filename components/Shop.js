import styles from "../styles/Shop.module.css"
import Money from "../components/atoms/Money"
import ButtonCircle from "./atoms/ButtonCircle";

function Shop(){
    return (
        <div className={styles.container}>
            <div className={styles.divShopButton}>
                <button className={styles.shopButton}>Boutique</button>
            </div>

            <div className={styles.divBottom}>
                <div className={styles.divLeft}>
                    <Money />
                    <button className={styles.stuffButton}>Inventaire</button>
                    <div className={styles.stuff}>
                        <button className={styles.stuffScreen}>
                            Faut 
                        </button>
                        <button className={styles.stuffScreen}>
                            Pas 
                        </button>
                        <button className={styles.stuffScreen}>
                            Être
                        </button>
                        <button className={styles.stuffScreen}>
                            Trop
                        </button>
                        <button className={styles.stuffScreen}>
                            Curieux
                        </button>
                        <button className={styles.stuffScreen}>
                            Et
                        </button>
                        <button className={styles.stuffScreen}>
                            Lire
                        </button>
                        <button className={styles.stuffScreen}>
                            Ce
                        </button>
                        <button className={styles.stuffScreen}>
                            Que
                        </button>
                        <button className={styles.stuffScreen}>
                            J'ai
                        </button>
                        <button className={styles.stuffScreen}>
                            Marqué
                        </button>
                        <button className={styles.stuffScreen}>
                            Ok ?
                        </button>
                    </div>    
                </div>

                
                <div className={styles.itemSelectionShop}>
                        <button className={styles.itemInShop}>
                            <div className={styles.buyButton}>
                                <Money />
                                <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                            </div>
                        </button>
                        <button className={styles.itemInShop}>
                            Excalibur
                        </button>
                        <button className={styles.itemInShop}>
                            Excalibur
                        </button>
                        <button className={styles.itemInShop}>
                            Excalibur
                        </button>
                        <button className={styles.itemInShop}>
                            Excalibur
                        </button>
                        <button className={styles.itemInShop}>
                            Excalibur
                        </button>
                </div>
            </div>
        </div>

            
    )
}

export default Shop;