import React from "react";
import styles from "../../styles/organisms/SkillsContainer.module.css";
import TitleAtoms from "../atoms/TitleAtoms";
import SkillsBox from "../molecules/SkillsBox";

const VoleurData = [
  {
    skill: "Attaque Sournoise",
    skillDesc:
      "Une attaque discrète qui inflige des dégâts critiques à un ennemi sans méfiance.",
    skillIcon: "./logoBlack.png",
  },
  {
    skill: "Dissimulation",
    skillDesc:
      "Le voleur se dissimule dans l'ombre, devenant invisible aux ennemis.",
    skillIcon: "./logoBlack.png",
  },
  {
    skill: "Pickpocket",
    skillDesc:
      "Permet de voler de l'or et des objets aux ennemis ou aux PNJ sans être détecté.",
    skillIcon: "./logoBlack.png",
  },
];

const skillsData = VoleurData.map((data, i) => {
  return <SkillsBox {...data} key={i} />;
});

function SkillsContainer() {




  return (
    <>
      <div className={styles.container}>
        <TitleAtoms title={"Skills"} width="85%" />
        {skillsData}
      </div>
    </>
  );
}

export default SkillsContainer;
