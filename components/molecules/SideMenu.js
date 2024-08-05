import styles from "../../styles/molecules/SideMenu.module.css";
import AtomLink from "../atoms/AtomLink";

const SideMenu = () => {
    const tableContentRoute = [
        { href: "#", nameIcon: "calendarAddOn", children: "habitudes" },
        { href: "#", nameIcon: "task_alt", children: "taches" },
        { href: "#", nameIcon: "id_card", children: "fiche de personnage" },
    ];
    const items = tableContentRoute.map((element, i) => {
        <AtomLink key={i} href={element.href} nameIcon={element.nameIcon} />;
    });
    return (
        <>
            <aside className={styles.sidebar}>{items}</aside>
        </>
    );
};

export default SideMenu;
