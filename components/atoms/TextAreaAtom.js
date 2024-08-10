import styles from "../../styles/atoms/TextAreaAtom.module.css";

const TextAreaAtom = ({
    placeholder,
    variant,
    width,
    height,
    onChange,
    value,
    labelFor,
}) => {
    const textareaStyles = {
        primary: {
            border: "3px solid #A50104",
            borderRadius: "10px",
            width,
            height,
            resize: "none",
        },
        secondary: {
            border: "3px solid #FCD757",
            borderRadius: "10px",
            width,
            height,
            resize: "none",
        },
    };

    return (
        <>
            <textarea
                id={labelFor}
                value={value}
                className={styles.textarea}
                style={textareaStyles[variant]}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    );
};

export default TextAreaAtom;

// Elements à utiliser dans le composant parent =>

// import TextAreaAtom from "./atoms/TextAreaAtom";

// const [description, setDescription] = useState("");

// <TextAreaAtom
//   value={description}
//   onChange={(e) => setDescription(e.target.value)}
//   placeholder="Saisissez la description"
//   width="100%"
//   maxHeight="150px"
//   variant="primary"
//   labelFor="descriptionInput"
// />;
