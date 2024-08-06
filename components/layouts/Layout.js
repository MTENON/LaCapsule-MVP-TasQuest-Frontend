import styles from "../../styles/layout/Layout.module.css";
import NavMenu from "../molecules/NavMenu";
import SideMenu from "../molecules/SideMenu";

function Layout({ children }) {
    return (
        <>
            <div className={styles.layout}>
                <header className={styles.header}>
                    <NavMenu />
                </header>
                <aside className={styles.sideMenu}>
                    <SideMenu />
                </aside>
                <main className={styles.content}>{children}</main>
            </div>
        </>
    );
}

export default Layout;
