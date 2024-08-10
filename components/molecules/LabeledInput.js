import TextInputs from "../atoms/TextInputs";
import TextAreaAtom from "../atoms/TextAreaAtom";
import styles from "../../styles/molecules/LabeledInput.module.css";

function LabeledInput({
    label,
    placeholder,
    variant,
    width,
    type,
    onChange,
    value,
    labelFor,
    isTextarea = false,
    height,
    required,
}) {
    return (
        <div className={styles.labeledInputContainer}>
            <label htmlFor={labelFor}>{label}</label>
            {isTextarea ? (
                <TextAreaAtom
                    id={labelFor}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    width={width}
                    variant={variant}
                    height={height}
                />
            ) : (
                <TextInputs
                    id={labelFor}
                    value={value}
                    type={type}
                    onChange={onChange}
                    placeholder={placeholder}
                    width={width}
                    variant={variant}
                    required={required}
                />
            )}
        </div>
    );
}

export default LabeledInput;

// Elements à utiliser dans le composant parent concerné =>

// const [inputValue, setInputValue] = useState("");
// const [textareaValue, setTextareaValue] = useState("");

// <LabeledInput
//   label="Nom"
//   labelFor="nameInput"
//   value={inputValue}
//   type="text"
//   onChange={(e) => setInputValue(e.target.value)}
//   placeholder="Saisissez votre nom"
//   width="300px"
//   variant="primary"
// />

// <LabeledInput
//   label="Description"
//   labelFor="descriptionInput"
//   value={textareaValue}
//   onChange={(e) => setTextareaValue(e.target.value)}
//   placeholder="Saisissez une description"
//   width="100%"
//   height="150px"
//   variant="secondary"
//   isTextarea={true} // Spécifie que ce champ doit être un textarea
// />
