import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "../atoms/Button";
import styles from "../../styles/molecules/Dropdown.module.css";

const Dropdown = ({ addTodo, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAddTodoClick = () => {
        handleClose();
        if (addTodo) addTodo();
    };

    const handleEditClick = () => {
        handleClose();
        if (onEdit) onEdit();
    };

    const handleDeleteClick = () => {
        handleClose();
        if (onDelete) onDelete();
    };

    return (
        <div>
            <Button
                variant="primary"
                icon="ph:pen"
                func={handleClick}
                classeName={styles.iconSize}
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
                <MenuItem onClick={handleAddTodoClick}>
                    Ajouter une todo
                </MenuItem>
                <MenuItem onClick={handleEditClick}>Modifier</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Supprimer</MenuItem>
            </Menu>
        </div>
    );
};

export default Dropdown;
