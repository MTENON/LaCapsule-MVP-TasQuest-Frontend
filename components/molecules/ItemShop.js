import React from 'react'
import Money from '../atoms/Money';
import ButtonCircle from '../atoms/ButtonCircle';
import styles from "../../styles/molecules/ItemShop.module.css"

import PopoverCustom from './PopoverCustom';

export default function ItemShop({ name, icon, price, description, handleClick }) {

  function handleButton() {
    handleClick()
  }

  return (

    <PopoverCustom message={description}>
      <div className={styles.itemImage}>

        <img
          src={icon}
          height={'85%'}
          width={'85%'}
          alt={icon}
          onError={({ currentTarget }) => currentTarget.src = '/default.png'}
        ></img>


        <div className={styles.itemBottom}>
          <div className={styles.itemName}>{name}</div>
          <div className={styles.itemButtons}>
            <Money
              pieces={price}
            />
            <ButtonCircle icon={"mingcute:cross-fill"} variant={"primary"} func={handleButton} />
          </div>
        </div>
      </div>
    </PopoverCustom >

  )
}
