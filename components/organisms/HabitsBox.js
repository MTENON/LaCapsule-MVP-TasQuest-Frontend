import styles from "../../styles/molecules/HabitsBox.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMoney, updateXP } from "../../reducers/users";
import moment from "moment";
import Menu from "@mui/material/Menu";
import Checkboxes from "../atoms/Checkboxes";
import TaskAtom from "../atoms/TaskAtom";
import Button from "../atoms/Button";
import ModifHabit from "../molecules/ModifHabit";
import DelHabits from "../molecules/delHabits";
import PauseHabits from "../molecules/PauseHabits";
import PopoverCustom from "../molecules/PopoverCustom";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

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
  const dispatch = useDispatch();

  const [refreshDrop, setRefreshDrop] = useState(false);

  // <=======> Gestion du statut de l'habitude <=======> \\

  const [doneStatus, setDoneStatus] = useState(false);

  useEffect(() => {
    setDoneStatus(isDone);
  }, []);

  // <=======> Gestion du menu deroulant <=======> \\
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrop = () => {
    setRefreshDrop(!refreshDrop);
  };

  useEffect(() => {
    setAnchorEl(null);
  }, [refreshDrop]);

  // <=======> Gestion de l'affichage du hover des information de pause <=======> \\

  let hoverPause = null;
  let endDate = moment(pauseEnd).format("DD/MM/YYYY");

  if (pauseDesc && pauseEnd) {
    hoverPause = `${pauseDesc} — Date de fin prevu: ${endDate}`;
  } else if (pauseEnd === null) {
    hoverPause = pauseDesc;
  } else if (pauseDesc === null) {
    hoverPause = `Date de fin prevu: ${endDate})`;
  }

  // <=======> Fonction pour gérer la complétion de l'habitude <=======> \\

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
      dispatch(updateMoney(data.money));
      dispatch(updateXP(data.XP));
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <PopoverCustom
            message={
              desc ? desc + " — Difficulté : " + level : "Difficulté : " + level
            }
          >
            {fav ? (
              <p className={styles.text}>
                <Icon
                  style={{ color: "#a50104", marginLeft: "-8%", marginRight: "8%", fontSize: 35,  }}
                  icon="fluent-emoji-high-contrast:glowing-star"
                />
                {text}
              </p>
            ) : (
              <p className={styles.text}> {text}</p>
            )}
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
                  // Condition pour eviter l'affichage d'une boite vide au hover
                  <>
                    <PopoverCustom message={hoverPause}>
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
              {repNumber > 1
                ? "Tout(es) les " + repNumber + " " + labelTrad
                : "Tout(es) les " + labelTrad}
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
            {/* Gestion de la modification d'habitude */}
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
              dropdown={handleDrop}
            />
            {/* Gestion de la pause d'habitude */}
            <PauseHabits
              taskId={taskId}
              pause={pause}
              refreshHabits={refreshHabits}
              dropdown={handleDrop} // handleDrop ?
            />
            {/* Gestion de la suppresion d'habitude */}
            <DelHabits
              taskId={taskId}
              refreshHabits={refreshHabits}
              dropdown={handleDrop}
            />
          </Menu>
        </div>
      </TaskAtom>
    </>
  );
}

export default HabitsBox;
