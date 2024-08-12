import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";
import styles from "../styles/pages/character.module.css";
import SkillsContainer from "../components/organisms/SkillsContainer";

function CharacterPage() {
  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.container}>
          {/* <BackgroundGrey width="30%" height="100%"> */}
          <TitleAtoms title={"User"} width="85%" />
          {/* </BackgroundGrey> */}
        </div>
        <div className={styles.container}>
          {/* <BackgroundGrey width="30%" height="100%"> */}
          <TitleAtoms title={"Inventaire"} width="85%" />
          {/* </BackgroundGrey> */}
        </div>
        <SkillsContainer />
      </div>
    </Layout>
  );
}

export default CharacterPage;
