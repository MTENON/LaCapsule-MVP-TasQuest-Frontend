import React from 'react'

import styles from "../../styles/atoms/ItemInventory.module.css"

import PopoverCustom from '../molecules/PopoverCustom'

export default function ItemInventory({ icon, message }) {
  return (

    <div className={styles.stuffScreen}>
      <PopoverCustom
        message={message}
        className={styles.popup}
      >
        <img
          src={icon}
          height={'100%'}
          width={'100%'}
          alt={icon}
          onError={({ currentTarget }) => currentTarget.src = '/default.png'}
        ></img>
      </PopoverCustom>
    </div>

  )
}
