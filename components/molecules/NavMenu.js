import { useState } from "react";
import styles from "../../styles/molecules/NavMenu.module.css";
import AtomLink from "../atoms/AtomLink";
import Link from "next/link";
import NotificationBox from "./NotificationBox";

function NavMenu() {
    const [isConnected, setIsConnected] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const tableContentRoute = [
        {
            href: "/habits",
            nameIcon: "material-symbols:tag",
            variant: "navbar",
            children: "tags",
        },
        {
            href: "/notifications",
            nameIcon: "mdi:bell",
            variant: "navbar",
            children: "Notifications",
            onMouseEnter: () => setShowNotifications(true),
            onMouseLeave: () => setShowNotifications(false),
        },
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

    const items = tableContentRoute.map((element, i) => {
        return (
            <AtomLink
                key={i}
                href={element.href}
                nameIcon={element.nameIcon}
                variant={element.variant}
                children={element.children}
                onMouseEnter={element.onMouseEnter}
                onMouseLeave={element.onMouseLeave}
            />
        );
    });

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
                <Link href={isConnected ? "/profile" : "/home"}>
                    <div className={styles.logo}></div>
                </Link>

                <div className={styles.listItems}>{items}</div>
                <NotificationBox
                    isShown={showNotifications}
                    content={notifications}
                    showNotifications={() =>
                        setShowNotifications(!showNotifications)
                    }
                />
            </nav>
        </>
    );
}

export default NavMenu;
