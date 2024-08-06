import Link from "next/link";
import styles from "../../styles/atoms/AtomLink.module.css";
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useRouter } from "next/router";

const AtomLink = ({ href, children, nameIcon, variant }) => {
    const [isHover, setIsHover] = useState(false);
    const router = useRouter();

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const isActive = router.pathname === href;
    const linkStyles = {
        sidebar: {
            backgroundColor: isHover ? "#fcd757" : "#a50104",
            color: isHover ? "#a50104" : "#fcd757",
            border: isHover ? "1px solid #a50104" : "none",
            borderRadius: isActive ? 20 : 50,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: isActive ? 60 : 50,
            width: isActive ? 60 : 50,
        },
        navbar: {
            textDecoration: isActive ? "underline" : "none",
            color: isHover ? "#F0EFEF" : "#fcd757",
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
                    <Icon icon={nameIcon} width="32" height="32" />
                    {children}
                </div>
            </Link>
        </>
    );
};

export default AtomLink;
