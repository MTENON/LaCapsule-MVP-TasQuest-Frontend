import React from 'react'
import { Icon } from "@iconify-icon/react";
import styles from "../../styles/atoms/ItemInventory.module.css"

//Importation de la Modal
import ModalForAllItems from '../atoms/ModalForAllItems';


export default function ItemInventory(props) {


  
  return (


    <div className={styles.inventoryScreen}>
      <ModalForAllItems
      name={props.name}
      description={props.description}
      >
            <Icon 
            className={styles.inventorySize} 
            icon="game-icons:ancient-sword" 
            style={{cursor: "pointer"}}
            />
      </ModalForAllItems>
    </div>
    
  )
}
