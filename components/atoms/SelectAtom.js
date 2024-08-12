import React from "react";
import styles from "../../styles/atoms/SelectAtom.module.css";

function SelectAtom({
  children,
  marginBottom,
  height,
  width,
  variant,
  onChange,
  value,
  required,
}) {
  const selectStyles = {
    primaryBottom: {
      borderBottom: "3px solid #A50104",
      borderRadius: "2px",
      width,
      height,
      marginBottom,
    },
    secondaryBottom: {
      borderBottom: "3px solid #FCD757",
      borderRadius: "2px",
      width,
      height,
      marginBottom,
    },
    primaryAll: {
      border: "3px solid #A50104",
      borderRadius: "10px",
      width,
      height,
      marginBottom,
    },
    secondaryAll: {
      border: "3px solid #FCD757",
      borderRadius: "10px",
      width,
      height,
      marginBottom,
    },
  };
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      variant={variant}
      className={styles.menu}
      style={selectStyles[variant]}
    >
      {children}
    </select>
  );
}

export default SelectAtom;
