import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "./Button";
import ModifHabit from "../molecules/ModifHabit";
// import styles from "../../styles/molecules/Dropdown.module.css";

const Dropdown = ({
  taskId,
  text,
  desc,
  level,
  repNumber,
  labelTrad,
  enLabel,
  fav,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        variant="primary"
        icon="ph:pen"
        handleClick={handleClick}
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
        {/* <MenuItem onClick={handleClose}>Modifier</MenuItem> */}
        <ModifHabit
          taskId={taskId}
          text={text}
          repNumber={repNumber}
          labelTrad={labelTrad}
          enLabel={enLabel}
          fav={fav}
          desc={desc}
          level={level}
        />
        <MenuItem onClick={handleClose}>Supprimer</MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
