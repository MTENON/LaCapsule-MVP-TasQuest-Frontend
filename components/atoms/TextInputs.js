import styles from "../../styles/atoms/TextInputs.module.css";
import React from "react";

function TextInputs({ placeholder, variant, width, type, onChange, value }) {
  const inputStyles = {
    primaryBottom: {
      borderBottom: "3px solid #A50104",
      borderRadius: "2px",
      width,
    },
    secondaryBottom: {
      borderBottom: "3px solid #FCD757",
      borderRadius: "2px",
      width,
    },
    primaryAll: {
      border: "3px solid #A50104",
      borderRadius: "10px",
      width,
    },
    secondaryAll: {
      border: "3px solid #FCD757",
      borderRadius: "10px",
      width,
    },
  };

  return (
    <>
      <input
        value={value}
        className={styles.input}
        style={inputStyles[variant]}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputs;

// Elements a utiliser dans le composant parent concerné =>

// import TextInputs from "./atoms/TextInputs";

// const [text, setText] = useState("");

// <TextInputs
//   value={text}
//   type="text"
//   onChange={(e) => setText(value)}
//   placeholder="placeholder"
//   width={300}
//   variant="secondaryAll"
// />;
