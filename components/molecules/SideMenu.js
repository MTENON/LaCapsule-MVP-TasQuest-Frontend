import styles from "../../styles/molecules/SideMenu.module.css";
import AtomLink from "../atoms/AtomLink";

const SideMenu = () => {
    const tableContentRoute = [
        {
            href: "/habits",
            nameIcon: "fluent:calendar-todo-32-light",
            variant: "primary",
        },
        { href: "/tasks", nameIcon: "octicon:tasklist", variant: "primary" },
        { href: "/character", nameIcon: "bi:person-vcard", variant: "primary" },
        {
            href: "/inventory",
            nameIcon: "icon-park-outline:retro-bag",
            variant: "primary",
        },
        {
            href: "/quests",
            nameIcon: "game-icons:shoulder-armor",
            variant: "primary",
        },
        { href: "/shop", nameIcon: "carbon:shopping-bag", variant: "primary" },
        { href: "#", nameIcon: "uil:file-medical-alt", variant: "primary" },
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

    console.log(items);
    return (
        <>
            <div className={styles.sidebar}>{items}</div>
        </>
    );
};

export default SideMenu;
