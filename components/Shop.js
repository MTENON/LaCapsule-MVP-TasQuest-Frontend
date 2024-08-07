import styles from "../styles/Shop.module.css"
import Money from "../components/atoms/Money"
import ButtonCircle from "./atoms/ButtonCircle";

function Shop(){
    return (
        <div className={styles.container}>
            <div className={styles.divShopButton}>
            <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                <button className={styles.shopButton}>Boutique</button>
            </div>

            <div className={styles.divBottom}>
                <div className={styles.divLeft}>
                    <Money />
                    <button className={styles.stuffButton}>Inventaire</button>
                    <div className={styles.stuff}>
                        <div className={styles.stuffScreen}>
                            Faut 
                        </div>
                        <div className={styles.stuffScreen}>
                            Pas 
                        </div>
                        <div className={styles.stuffScreen}>
                            Être
                        </div>
                        <div className={styles.stuffScreen}>
                            Trop
                        </div>
                        <div className={styles.stuffScreen}>
                            Curieux
                        </div>
                        <div className={styles.stuffScreen}>
                            Et
                        </div>
                        <div className={styles.stuffScreen}>
                            Lire
                        </div>
                        <div className={styles.stuffScreen}>
                            Ce
                        </div>
                        <div className={styles.stuffScreen}>
                            Que
                        </div>
                        <div className={styles.stuffScreen}>
                            J'ai
                        </div>
                        <div className={styles.stuffScreen}>
                            Marqué
                        </div>
                        <div className={styles.stuffScreen}>
                            Ok ?
                        </div>
                    </div>    
                </div>


                <div className={styles.itemSelectionShop}>
                        <div className={styles.itemInShop}>
                                    <div>  {/* IMAGE of ITEM */}
                                        Excalibur
                                    </div>
                                    <div className={styles.buyingButtons}>
                                        <Money />
                                        <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                                    </div>
                        </div>
                        <div className={styles.itemInShop}>
                                    <div>  {/* IMAGE of ITEM */}
                                        Excalibur
                                    </div>
                                    <div className={styles.buyingButtons}>
                                        <Money />
                                        <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                                    </div>
                        </div>
                        <div className={styles.itemInShop}>
                                    <div>  {/* IMAGE of ITEM */}
                                        Excalibur
                                    </div>
                                    <div className={styles.buyingButtons}>
                                        <Money />
                                        <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                                    </div>
                        </div>
                        <div className={styles.itemInShop}>
                                    <div>  {/* IMAGE of ITEM */}
                                        Excalibur
                                    </div>
                                    <div className={styles.buyingButtons}>
                                        <Money />
                                        <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                                    </div>
                        </div>
                        <div className={styles.itemInShop}>
                                    <div>  {/* IMAGE of ITEM */}
                                        Excalibur
                                    </div>
                                    <div className={styles.buyingButtons}>
                                        <Money />
                                        <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                                    </div>
                        </div>
                        <div className={styles.itemInShop}>
                                    <div>  {/* IMAGE of ITEM */}
                                        Excalibur
                                    </div>
                                    <div className={styles.buyingButtons}>
                                        <Money />
                                        <ButtonCircle className={styles.buttonSpacing} icon={"mingcute:cross-fill"} variant={"primary"}/>
                                    </div>
                        </div>
                </div>
            </div>
        </div>

            
    )
}

export default Shop;