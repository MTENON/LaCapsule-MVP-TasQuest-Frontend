import styles from '../../styles/molecules/InventoryPanel.module.css'

import { useSelector } from 'react-redux'

//import de composants
import Money from '../atoms/Money'
import Gear from '../atoms/Gear'
import InventoryModal from './InventoryModal'

function InventoryPanel() {

    const money = useSelector((state) => state.user.money)

    //fake data for inventory
    const equipment = {
        necklace: {
            name: 'Amulette',
            description: 'Une amulette de puissance',
            icon: '/amulettes/amulette1.png'
        },
        head: {
            name: 'Casque',
            description: 'Protège du minimum syndical',
            icon: '/casques/casque_en_cuir.png'
        },
        hand1: {
            name: 'Main 1',
            description: "Cette arme légendaire brise les rocs les plus solides.",
            icon: '/armes/lame_d_eclat.png'
        },
        body: {
            name: 'Corps',
            description: "L'armure d'Arthur. Connue pour protéger de tous les dégats.",
            icon: '/armures/armure1.png'
        },
        hand2: {
            name: 'Main 2',
            description: "Aucun objet n'est assigné",
            icon: ''
        },
        bracelet: {
            name: 'Bracelet',
            description: "Aucun objet n'est assigné",
            icon: ''
        },
        boots: {
            name: 'Bottes',
            description: "Aucun objet n'est assigné",
            icon: ''
        },
        ring: {
            name: 'Bague',
            description: 'Un anneau très unique qui brille quand il à chaud.',
            icon: '/bagues/anneau1.png'
        },
    }

    return (
        <div className={styles.inventoryContainer}>
            <h2 style={{ fontSize: '32px' }}>Inventaire</h2>
            <Money pieces={money} />
            <div className={styles.inventory}>
                <div className={styles.row}>

                    <InventoryModal
                        name={equipment.hand1.name}
                        message={equipment.hand1.description}
                        icon={equipment.hand1.icon.trim()}
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