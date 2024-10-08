import { useEffect, useState } from "react";
import styles from "../../styles/molecules/DifficultyRating.module.css";
import { Icon } from "@iconify-icon/react";

const DifficultyRating = ({ variant = "primary", onClick, note = 0 }) => {
    const [currentNote, setCurrentNote] = useState(note);
    const [hoveredNote, setHoveredNote] = useState(null);

    const rating = [];

    useEffect(() => {
        setCurrentNote(note);
    }, [note]);

    const colors = {
        primary: "#A50104",
        secondary: "#FCD757",
    };

    // Sélectionne la couleur en fonction de la variante
    const selectedColor = colors[variant];

    // Boucle pour générer les icônes de difficulté
    for (let i = 1; i <= 5; i++) {
        // Style par défaut pour les icônes (couleur tertiary)
        let style = { cursor: "pointer", color: "#F0EFEF" };

        if (i <= currentNote) {
            style = { ...style, color: selectedColor };
        }

        // Applique la couleur et l'ombre au hover
        if (hoveredNote !== null && i <= hoveredNote) {
            style.color = selectedColor;
            style.boxShadow = `0 0 5px ${selectedColor}`;
            style.borderRadius = "50%";
        }

        // Ajoute l'icône au tableau `rating`
        rating.push(
            <Icon
                key={i}
                onClick={() => {
                    setCurrentNote(i);
                    onClick(i);
                }}
                onMouseEnter={() => setHoveredNote(i)}
                onMouseLeave={() => setHoveredNote(null)}
                icon="mdi:emoticon-devil"
                style={style}
                width={40}
                height={40}
            />
        );
    }

    return <div className={styles.container}>{rating}</div>;
};

export default DifficultyRating;

// Éléments à utiliser dans le composant parent concerné =>

// import DifficultyRating from "./molecules/DifficultyRating";

// const [difficulty, setDifficulty] = useState(0);

/*  <DifficultyRating
        variant="primary"      
        note={difficulty}       
        onClick={setDifficulty}  
        />
        */
