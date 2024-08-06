import styles from "../../styles/molecules/SideMenu.module.css";
import AtomLink from "../atoms/AtomLink";

const SideMenu = () => {
    const tableContentRoute = [
        {
            href: "/habits",
            nameIcon: "fluent:calendar-todo-32-light",
            variant: "sidebar",
        },
        { href: "/tasks", nameIcon: "octicon:tasklist", variant: "sidebar" },
        { href: "/character", nameIcon: "bi:person-vcard", variant: "sidebar" },
        {
            href: "/inventory",
            nameIcon: "icon-park-outline:retro-bag",
            variant: "sidebar",
        },
        {
            href: "/quests",
            nameIcon: "game-icons:shoulder-armor",
            variant: "sidebar",
        },
        { href: "/shop", nameIcon: "carbon:shopping-bag", variant: "sidebar" },
        { href: "#", nameIcon: "uil:file-medical-alt", variant: "sidebar" },
    ];
    const items = tableContentRoute.map((element, i) => {
        return (
            <AtomLink
                key={i}
                href={element.href}
                nameIcon={element.nameIcon}
                variant={element.variant}
            />
        );
    });

    return (
        <>
            <div className={styles.sidebar}>{items}</div>
        </>
    );
};

export default SideMenu;
