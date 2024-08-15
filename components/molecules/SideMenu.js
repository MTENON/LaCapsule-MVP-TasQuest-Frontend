import styles from "../../styles/molecules/SideMenu.module.css";
import AtomLink from "../atoms/AtomLink";
import PopoverCustom from "./PopoverCustom";

const SideMenu = () => {
    // Tableau contenant les informations de navigation
    const tableContentRoute = [
        {
            href: "/habits",
            nameIcon: "fluent:calendar-todo-32-light",
            variant: "sidebar",
            popoverMessage: "Habitudes",
        },
        {
            href: "/tasks",
            nameIcon: "octicon:tasklist",
            variant: "sidebar",
            popoverMessage: "Tâches/Todos",
        },
        {
            href: "/character",
            nameIcon: "bi:person-vcard",
            variant: "sidebar",
            popoverMessage: "Personnage",
        },
        {
            href: "/inventory",
            nameIcon: "icon-park-outline:retro-bag",
            variant: "sidebar",
            popoverMessage: "Inventaire",
        },
        {
            href: "/quests",
            nameIcon: "game-icons:shoulder-armor",
            variant: "sidebar",
            popoverMessage: "Quêtes",
        },
        {
            href: "/shop",
            nameIcon: "carbon:shopping-bag",
            variant: "sidebar",
            popoverMessage: "Boutique",
        },
    ];

    // Génération des éléments de navigation avec PopoverCustom et AtomLink
    const items = tableContentRoute.map((element, i) => {
        return (
            <PopoverCustom
                key={i}
                element={
                    <AtomLink
                        href={element.href}
                        nameIcon={element.nameIcon}
                        variant={element.variant}
                        popoverMessage={element.popoverMessage}
                    />
                }
                message={element.popoverMessage}
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
