import { useState } from "react";
import styles from "../../styles/molecules/NavMenu.module.css";
import AtomLink from "../atoms/AtomLink";
import Link from "next/link";
import NotificationBox from "./NotificationBox";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";

function NavMenu() {
    // États pour gérer la connexion, le survol et l'affichage des notifications
    const [isHover, setIsHover] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Tableau contenant les informations de navigation
    const tableContentRoute = [
        {
            href: "/settings",
            nameIcon: "lets-icons:setting-fill",
            variant: "navbar",
            children: "Paramètres",
        },
        {
            href: "#",
            nameIcon: "mdi:connection",
            variant: "navbar",
            children: "Déconnexion",
        },
    ];

    // Génération des éléments de navigation
    const items = tableContentRoute.map((element, i) => {
        return (
            <AtomLink
                key={i}
                href={element.href}
                nameIcon={element.nameIcon}
                variant={element.variant}
                children={element.children}
                onClick={element.onClick}
            />
        );
    });

    //Style pour le hover des notification
    let style = { color: isHover ? "#F0EFEF" : "#fcd757" };

    //Functions d'événement pour le hover
    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    // Fonction pour afficher ou masquer les notifications
    function handleShowNotifications() {
        setShowNotifications(!showNotifications);
    }

    // Données fictives pour les notifications
    let notifications = [
        {
            title: "Notification 1",
            content: "Coucou je suis un children prop.",
        },
        {
            title: "Notification 2 qui déborde",
            content:
                "Coucou je suis une notification énorme qui va dépasser le contenu.",
        },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                {/*------ Lien vers le profil ou la page d'accueil basé sur l'état de connexion -----*/}
                <Link href="/profile">
                    <a>
                        <Image
                            src="/logoYellow.png"
                            alt="logo jaune"
                            width={95}
                            height={95}
                        />
                    </a>
                </Link>

                <div className={styles.listItems}>
                    <button
                        className={styles.btn}
                        style={style}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleShowNotifications()}
                    >
                        <Icon icon="mdi:bell" width="32" height="32" />
                        Notifications
                    </button>

                    {/*------- Affichage des éléments de navigation -----*/}
                    {items}
                    {/*-------- Boîte de notifications ---------*/}
                    <NotificationBox
                        isShown={showNotifications}
                        content={notifications}
                    />
                </div>
            </nav>
        </>
    );
}

export default NavMenu;
