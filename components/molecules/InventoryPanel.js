import styles from '../../styles/molecules/InventoryPanel.module.css'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//import de composants
import Money from '../atoms/Money'
import Gear from '../atoms/Gear'
import InventoryModal from './InventoryModal'

//import reducer
import { addItem, updateEquipment } from '../../reducers/inventory'

function InventoryPanel() {

    const dispatch = useDispatch;

    const money = useSelector((state) => state.user.money);

    //fake data for inventory
    const [equipment, setEquipment] = useState(useSelector((state) => state.inventory.equipment))

    function handleChangeItem(data, originalItem) {
        console.log('Objet', data)
        console.log('Objet', originalItem)
    }

    return (
        <div className={styles.inventoryContainer}>
            <h2 style={{ fontSize: '32px' }}>Inventaire</h2>
            <Money pieces={money} />
            <div className={styles.inventory}>
                <div className={styles.row}>

                    <InventoryModal
                        name={equipment.hand1.name}
                        itemName={equipment.hand1.itemName}
                        message={equipment.hand1.description}
                        icon={equipment.hand1.icon.trim()}
                        action={handleChangeItem}
                    >
                        <Gear
                            name={equipment.hand1.name}
                            message={equipment.hand1.description}
                            icon={equipment.hand1.icon.trim()}
                        />
                    </InventoryModal>

                    <InventoryModal
                        name={equipment.hand2.name}
                        message={equipment.hand2.description}
                        itemName={equipment.hand2.itemName}
                        icon={equipment.hand2.icon.trim()}
                    >
                        <Gear
                            name={equipment.hand2.name}
                            message={equipment.hand2.description}
                            icon={equipment.hand2.icon.trim()}
                        />
                    </InventoryModal>

                </div>

                <div className={styles.row}>

                    <InventoryModal
                        name={equipment.necklace.name}
                        message={equipment.necklace.description}
                        itemName={equipment.necklace.itemName}
                        icon={equipment.necklace.icon.trim()}
                    >
                        <Gear
                            name={equipment.necklace.name}
                            message={equipment.necklace.description}
                            icon={equipment.necklace.icon.trim()}
                        />
                    </InventoryModal>

                    <InventoryModal
                        name={equipment.body.name}
                        message={equipment.body.description}
                        itemName={equipment.body.itemName}
                        icon={equipment.body.icon.trim()}
                    >
                        <Gear
                            name={equipment.body.name}
                            message={equipment.body.description}
                            icon={equipment.body.icon.trim()}
                        />
                    </InventoryModal>

                    <InventoryModal
                        name={equipment.head.name}
                        message={equipment.head.description}
                        itemName={equipment.head.itemName}
                        icon={equipment.head.icon.trim()}
                    >
                        <Gear
                            name={equipment.head.name}
                            message={equipment.head.description}
                            icon={equipment.head.icon.trim()}
                        />
                    </InventoryModal>
                </div>

                <div className={styles.row}>
                    <InventoryModal
                        name={equipment.bracelet.name}
                        itemName={equipment.bracelet.itemName}
                        message={equipment.bracelet.description}
                        icon={equipment.bracelet.icon.trim()}
                    >
                        <Gear
                            name={equipment.bracelet.name}
                            message={equipment.bracelet.description}
                            icon={equipment.bracelet.icon.trim()}
                        />
                    </InventoryModal>

                    <InventoryModal
                        name={equipment.boots.name}
                        itemName={equipment.boots.itemName}
                        message={equipment.boots.description}
                        icon={equipment.boots.icon.trim()}
                    >
                        <Gear
                            name={equipment.boots.name}
                            message={equipment.boots.description}
                            icon={equipment.boots.icon.trim()}
                        />
                    </InventoryModal>

                    <InventoryModal
                        name={equipment.ring.name}
                        itemName={equipment.ring.itemName}
                        message={equipment.ring.description}
                        icon={equipment.ring.icon.trim()}
                    >
                        <Gear
                            name={equipment.ring.name}
                            message={equipment.ring.description}
                            icon={equipment.ring.icon.trim()}
                        />
                    </InventoryModal>
                </div>
            </div>
        </div>
    )
}

export default InventoryPanel;