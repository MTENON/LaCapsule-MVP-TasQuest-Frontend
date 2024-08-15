import { useState } from "react";
import styles from "../../styles/molecules/NavMenu.module.css";
import AtomLink from "../atoms/AtomLink";
import Link from "next/link";
import NotificationBox from "./NotificationBox";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetUserState } from "../../reducers/users";

function NavMenu() {
    // États pour gérer la connexion, le survol et l'affichage des notifications
    const [isHover, setIsHover] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

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
            onClick: () => {
                dispatch(resetUserState());
                router.push("/");
            },
        },
    ];

    // Génération des éléments de navigation
    const items = tableContentRoute.map((element, i) => {
        return (
            <span
                key={i} // Correction: ajout du key prop ici
                style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <AtomLink
                    href={element.href}
                    nameIcon={element.nameIcon}
                    variant={element.variant}
                    children={element.children}
                    onClick={element.onClick}
                />
            </span>
        );
    });

    // Style pour le hover des notifications
    let style = { color: isHover ? "#F0EFEF" : "#fcd757" };

    // Fonctions d'événement pour le hover
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
            title: "Bienvenue sur Tas'Quest",
            content: "Bienvenue! Découvrez nos fonctionnalités..",
        },
        {
            title: "Testez les habitudes",
            content:
                "Commencez par vous créer une habitude et déterminez un rythme. Commencez tout de suite à faire vos tâches!",
        },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                {/*------ Lien vers le profil ou la page d'accueil basé sur l'état de connexion -----*/}
                <Link href="/habits">
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
                        <span
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Icon icon="mdi:bell" width="32" height="32" />
                            Notifications
                        </span>
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
