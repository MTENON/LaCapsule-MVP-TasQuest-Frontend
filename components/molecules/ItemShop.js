import React, { useState } from 'react'
import Money from '../atoms/Money';
import ButtonCircle from '../atoms/ButtonCircle';
import styles from "../../styles/molecules/ItemShop.module.css"


import { Icon } from "@iconify-icon/react";


//Importation de la Modal
import ModalForAllItems from '../atoms/ModalForAllItems';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ItemShop(props) {

  console.log(props.icon);
  

  return (

    

    <div className={styles.itemImage}>
      <ModalForAllItems
      name={props.name}
      description={props.description}
      icon={props.icon}
      >
                 <Icon 
                  // icon={props.icon}
                  icon="game-icons:ancient-sword" 
                  className={styles.itemSize} 
                  style={{cursor: "pointer"}}
                />
      </ModalForAllItems>
        
        <div className={styles.itemBottom}>
                <div className={styles.itemName}>{props.name}</div>
                <div className={styles.itemButtons}>
                    <Money pieces={props.price} style={{color: "#fff"}}/>
                    <ButtonCircle icon={"mingcute:cross-fill"} variant={"primary"}/>
                </div>  
        </div>
        

    </div>

  )
}
