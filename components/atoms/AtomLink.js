import Link from "next/link";
import styles from "../../styles/atoms/AtomLink.module.css";
import { useState } from "react";

const AtomLink = ({ href, children, nameIcon, variant }) => {
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const linkStyles = {
        primary: {
            backgroundColor: isHover ? "#fcd757" : "#a50104",
            color: isHover ? "#a50104" : "#fcd757",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: 50,
            borderRadius: 50,
        },
        secondary: {
            backgroundColor: "#fcd757",
            color: "#a50104",
        },
    };
    return (
        <>
            <Link href={href} className={styles.link}>
                <div
                    style={linkStyles[variant]}
                    className={styles.containerLink}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="material-icons">{nameIcon}</div>
                    {children}
                </div>
            </Link>
        </>
    );
};

export default AtomLink;
