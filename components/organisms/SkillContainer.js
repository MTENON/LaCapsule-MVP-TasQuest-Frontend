import React from "react";
import styles from "../../styles/organisms/SkillContainer.module.css";
import SkillsBox from "../molecules/SkillBox";

const VoleurData = [
    {
        skill: "Attaque Sournoise",
        skillDesc:
            "Une attaque discrète qui inflige des dégâts critiques à un ennemi sans méfiance.",
        skillIcon: "/skills/rogue/attaque_sournoise.png",
    },
    {
        skill: "Dissimulation",
        skillDesc:
            "Le voleur se dissimule dans l'ombre, devenant invisible aux ennemis.",
        skillIcon: "/skills/rogue/dissimulation.png",
    },
    {
        skill: "Pickpocket",
        skillDesc:
            "Permet de voler de l'or et des objets aux ennemis ou aux PNJ sans être détecté.",
        skillIcon: "/skills/rogue/vol_a_la_tire.png",
    },
];

const skillsData = VoleurData.map((data, i) => {
    return <SkillsBox {...data} key={i} />;
});

function SkillsContainer() {




    return (
        <>
            <div className={styles.container}>
                <h2 style={{ fontSize: '32px' }}>Compétences</h2>

                {skillsData}
            </div>
        </>
    );
}

export default SkillsContainer;