import { useState } from "react";
import styles from "../../styles/molecules/HabitsBox.module.css";
import Button from "../atoms/Button";
import Checkboxes from "../atoms/Checkboxes";
import { useSelector } from "react-redux";
import TaskAtom from "../atoms/TaskAtom";

const link = process.env.BACK_LINK;

function HabitsBox({ name, text, repeat, taskId }) {
  const [checked, setChecked] = useState(false);
  const token = useSelector((state) => state.user.token);


  const handleCheck = (value) => {
    console.log("add the fetch for /isdone route", taskId);

    fetch(`${link}/habits/isdone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setChecked(data.isDone);
        } else {
          console.log(data.message);
        }
      });
  };

  const handleNewHabits = () => {
    console.log("add the fetch for /modify route", taskId);
    // inverse data flow ? modify(taskId)
  };

  console.log("Check ", checked);

  return (
    <>
      {/* <div className={styles.container} style={containerStyles[variant]}> */}
      <TaskAtom>
        <div className={styles.leftBox}>
          <Checkboxes
            name={name}
            handleCheck={handleCheck}
            variant={checked ? "primaryChecked" : "primary"}
          />
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.rigthBox}>
          <p className={styles.text} >{repeat}</p>
          <Button icon="ph:pen" variant={"primary"} func={handleNewHabits} />
        </div>
      </TaskAtom>
      {/* </div> */}
    </>
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
//     return <HabitsBox key={data.taskId} variant={"primary"} {...data} />;
//   });

//   {habits}
