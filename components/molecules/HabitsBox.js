import { useEffect, useState } from "react";
import styles from "../../styles/molecules/HabitsBox.module.css";
import Checkboxes from "../atoms/Checkboxes";
import { useSelector } from "react-redux";
import TaskAtom from "../atoms/TaskAtom";
// import DropdownHabits from "../organisms/DropdownHabits";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "../atoms/Button";
import ModifHabit from "../molecules/ModifHabit";
import DelHabits from "../molecules/delHabits";

const link = process.env.backLink;

function HabitsBox({
  taskId,
  name,
  text,
  desc,
  level,
  repNumber,
  labelTrad,
  enLabel,
  fav,
  isDone,
  start,
}) {
  const token = useSelector((state) => state.user.token);

  const [doneStatus, setDoneStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setDoneStatus(isDone);
  }, []);

  const handleDone = async () => {
    try {
      const response = await fetch(`${link}/habits/isdone`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
        }),
      });

      const data = await response.json();

      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la modification de l'habitude");
      }
      setDoneStatus(!doneStatus);
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <TaskAtom>
        <div className={styles.leftBox}>
          <Checkboxes
            name={name}
            handleCheck={handleDone}
            variant={doneStatus ? "primaryChecked" : "primary"}
            value={doneStatus}
          />
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.rigthBox}>
          <p className={styles.text}>{repNumber + " " + labelTrad}</p>
          <Button
            variant="primary"
            icon="ph:pen"
            func={handleClick}
            // classeName={styles.iconSize}
          />
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ModifHabit
              taskId={taskId}
              text={text}
              repNumber={repNumber}
              enLabel={enLabel}
              fav={fav}
              desc={desc}
              level={level}
              start={start}
            />
            <DelHabits taskId={taskId} />
            <MenuItem onClick={handleClose}>Fermer</MenuItem>
          </Menu>
        </div>
      </TaskAtom>
    </>
  );
}

export default HabitsBox;
