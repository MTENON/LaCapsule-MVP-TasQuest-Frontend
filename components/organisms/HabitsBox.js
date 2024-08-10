import { useState } from "react";
import styles from "../../styles/molecules/HabitsBox.module.css";
import Checkboxes from "../atoms/Checkboxes";
import { useSelector } from "react-redux";
import TaskAtom from "../atoms/TaskAtom";
// import Button from "../atoms/Button";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import AtomButton from "../atoms/AtomButton";
// import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
// import ChildModal from "../molecules/ChildModal";
// import { Typography } from "@mui/material";
import ModifHabit from "../molecules/ModifHabit";
import Dropdown from "../atoms/DropdownHabits";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "65%",
//   height: "65%",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   gap: "2px",
// };

const link = process.env.BACK_LINK;

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
}) {
  const token = useSelector((state) => state.user.token);

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <TaskAtom>
        <div className={styles.leftBox}>
          <Checkboxes
            name={name}
            // handleCheck={handleCheck}
            variant={checked ? "primaryChecked" : "primary"}
          />
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.rigthBox}>
          <p className={styles.text}>{repNumber + " " + labelTrad}</p>
          <Dropdown
            taskId={taskId}
            text={text}
            repNumber={repNumber}
            labelTrad={labelTrad}
            enLabel={enLabel}
            fav={fav}
            desc={desc}
            level={level}
          />
          {/* <ModifHabit
            taskId={taskId}
            text={text}
            repNumber={repNumber}
            labelTrad={labelTrad}
            enLabel={enLabel}
            fav={fav}
            desc={desc} 
            level={level}
          /> */}
        </div>
      </TaskAtom>
    </>
  );
}

export default HabitsBox;
