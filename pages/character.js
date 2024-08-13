import TitleAtoms from "../components/atoms/TitleAtoms";
import Layout from "../components/layouts/Layout";

//imports de composants
import CharacterPanel from "../components/molecules/CharacterPanel";
import InventoryPanel from "../components/molecules/InventoryPanel";
import SkillsContainer from "../components/organisms/SkillContainer";

function CharacterPage() {
    return (
        <Layout>
            <div style={{
                height: '83vh',
                width: '85vw',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CharacterPanel />
                <InventoryPanel />
                <SkillsContainer />
            </div>
        </Layout>
    );
}

export default CharacterPage;
