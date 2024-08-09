import { useState } from "react";
import styles from "../../styles/molecules/HabitsBox.module.css";
import Button from "../atoms/Button";
import Checkboxes from "../atoms/Checkboxes";
import { useSelector } from "react-redux";

const link = process.env.BACK_LINK;

function HabitsBox({ name, text, variant, repeat, taskId }) {
  const [checked, setChecked] = useState(false);
  // const token = useSelector((state) => state.users.token);

  const handleCheck = (value) => {
    setChecked(value);

    console.log("add the fetch for /isdone route", taskId);
    // fetch(`${link}/isdone`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({}),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {});
  };

  const handleNewHabits = () => {
    console.log("add the fetch for /modify route", taskId);
    // inverse data flow ? modify(taskId)
  };

  const containerStyles = {
    primary: { border: "3px solid #A50104", backgroundColor: "#FCD757" },
    secondary: { border: "3px solid #FCD757", backgroundColor: "#A50104" },
  };

  return (
    <div className={styles.container} style={containerStyles[variant]}>
      <div className={styles.leftBox}>
        <Checkboxes
          name={name}
          handleCheck={handleCheck}
          variant={checked ? "primaryChecked" : "primary"}
        />
        <p>{text}</p>
      </div>
      <div className={styles.rigthBox}>
        <p>{repeat}</p>
        <Button icon="ph:pen" variant={"primary"} func={handleNewHabits} />
      </div>
    </div>
  );
}

export default HabitsBox;

// const habitsData = [
//     { text: "test de fausse habitude 1", repeat: "tous les 1 jours", taskId: 1 },
//     { text: "test de fausse habitude 2", repeat: "tous les 2 jours", taskId: 2 },
//     { text: "test de fausse habitude 3", repeat: "tous les 3 jours", taskId: 3 },
//     { text: "test de fausse habitude 4", repeat: "tous les 4 jours", taskId: 4 },
//   ];

//   const habits = habitsData.map((data, i) => {
//     return <HabitsBox key={data.id} variant={"primary"} {...data} />;
//   });

//   {habits}
