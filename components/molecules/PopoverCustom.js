import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";

// Composant PopoverCustom qui affiche un popover
export default function PopoverCustom({ element, message, children }) {
    // État pour gérer l'élément d'ancrage du popover
    // anchorEl est une référence à l'élément HTML sur lequel l'utilisateur a survolé sa souris
    const [anchorEl, setAnchorEl] = useState(null);

    // Fonctions pour ouvrir la popover au hover
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            {/*----- Élément déclencheur pour le popover ------*/}
            <div
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {element}
                {children}
            </div>
            {/*------ Composant Popover pour afficher le message ------*/}
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                    borderWidth: "2px",
                    borderColor: "secondary.main",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {/*----- Typographie pour le contenu du message ------*/}
                <Typography sx={{ p: 1 }}>{message}</Typography>
            </Popover>
        </div>
    );
}

/* 
    Utilisation du composant PopoverCustom :
        element : element react -> l'élément déclencheur du popover
        message : string -> le message à afficher dans le popover

    Exemple d'utilisation:
            <PopoverCustom
                element={
                    <AtomLink
                        href={element.href}
                        nameIcon={element.nameIcon}
                        variant={element.variant}
                        popoverMessage={element.popoverMessage}
                    />
                }
                message={element.popoverMessage}
            />
*/
