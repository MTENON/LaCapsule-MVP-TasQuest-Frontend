import React from 'react'
import { Icon } from "@iconify-icon/react";
import styles from "../../styles/atoms/ItemInventory.module.css"

export default function ItemInventory() {
  return (

    <div className={styles.stuffScreen}>
            <Icon className={styles.stuffSize} icon="game-icons:ancient-sword" />
    </div>
    
  )
}
