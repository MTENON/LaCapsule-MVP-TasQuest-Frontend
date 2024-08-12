import React from 'react'
import Money from '../atoms/Money';
import ButtonCircle from '../atoms/ButtonCircle';
import styles from "../../styles/molecules/ItemShop.module.css"

import { Icon } from "@iconify-icon/react";

export default function ItemShop() {
  return (


    <div className={styles.itemImage}>
        <div>  {/* IMAGE of ITEM */}
                <Icon className={styles.itemSize} icon="game-icons:ancient-sword" />
        </div>
        
        <div className={styles.itemBottom}>
                <div className={styles.itemName}>Item Name</div>
                <div className={styles.itemButtons}>
                    <Money />
                    <ButtonCircle icon={"mingcute:cross-fill"} variant={"primary"}/>
                </div>
        </div>
    </div>

  )
}
