import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/habits.module.css";

function SettingsPage() {
  return (
    <Layout>
      <div className={styles.content}>
        <TitleAtoms title={"Paramètres"} />
        <div className={styles.container}></div>
      </div>
    </Layout>
  );
}

export default SettingsPage;
