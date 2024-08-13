import React from "react";
import styles from "../../styles/molecules/SkillBox.module.css";

function SkillsBox({ skill, skillDesc, skillIcon }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.icon}><img className={styles.img} src={skillIcon} alt={skillIcon} /></div>
        <div className={styles.text}>
          <h4 className={styles.title}>{skill}</h4>
          <p className={styles.desc}>{skillDesc}</p>
        </div>
      </div>
    </>
  );
}

export default SkillsBox;