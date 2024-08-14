import { useEffect, useState } from "react";
import styles from "../../styles/molecules/HabitsBox.module.css";
import Checkboxes from "../atoms/Checkboxes";
import { useSelector } from "react-redux";
import moment from "moment";
import TaskAtom from "../atoms/TaskAtom";
// import DropdownHabits from "../organisms/DropdownHabits";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "../atoms/Button";
import ModifHabit from "../molecules/ModifHabit";
import DelHabits from "../molecules/delHabits";
import PauseHabits from "../molecules/PauseHabits";
import PopoverCustom from "../molecules/PopoverCustom";

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
  end,
  pause,
  pauseDesc,
  pauseEnd,
  refreshHabits,
}) {
  const token = useSelector((state) => state.user.token);

  const [doneStatus, setDoneStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let hoverPause = null;
  let endDate = moment(pauseEnd).format("DD/MM/YYYY");

  if (pauseDesc && pauseEnd) {
    hoverPause = `${pauseDesc} — Date de fin prevu: ${endDate}`;
  } else if (pauseEnd === null) {
    hoverPause = pauseDesc;
  } else if (pauseDesc === null) {
    hoverPause = `Date de fin prevu: ${endDate})`;
  }

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

  // function refresh() {
  //   setRefresher(!refresher);
  //   handleRefresh();
  // }

  return (
    <>
      <TaskAtom width="85%" backgroundColor={pause ? "white" : ""}>
        <div className={styles.leftBox}>
          <Checkboxes
            name={name}
            handleCheck={handleDone}
            variant={doneStatus ? "primaryChecked" : "primary"}
            value={doneStatus}
          />
          <PopoverCustom message={desc}>
            <p className={styles.text}>{text}</p>
          </PopoverCustom>
        </div>
        <div className={styles.rigthBox}>
          <div className={styles.debut}>
            <p className={styles.debutText}>Début:</p>
            <p className={styles.debutText}>
              {moment(start).format("DD/MM/YYYY")}
            </p>
          </div>
          <div className={styles.fin}>
            {pause ? (
              <>
                {hoverPause ? (
                  <>
                    <PopoverCustom
                      message={hoverPause}
                      backgroundColor="#FCD757"
                    >
                      <p className={styles.pauseText}>En Pause</p>
                    </PopoverCustom>
                  </>
                ) : (
                  <p className={styles.pauseText}>En Pause</p>
                )}
              </>
            ) : (
              <>
                <p className={styles.finText}>Fin:</p>
                <p className={styles.finText}>
                  {moment(end).format("DD/MM/YYYY")}
                </p>
              </>
            )}
          </div>
          <div className={styles.rec}>
            <p className={styles.recText}>Récurrence:</p>
            <p className={styles.recText}>
              {"Tout(es) les " + repNumber + " " + labelTrad}
            </p>
          </div>
          <Button variant="primary" icon="ph:pen" func={handleClick} />
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
              refreshHabits={refreshHabits}
            />
            <DelHabits taskId={taskId} refreshHabits={refreshHabits} />
            <PauseHabits
              taskId={taskId}
              pause={pause}
              refreshHabits={refreshHabits}
            />
          </Menu>
        </div>
      </TaskAtom>
    </>
  );
}

export default HabitsBox;
