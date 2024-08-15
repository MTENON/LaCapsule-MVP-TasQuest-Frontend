import styles from "../styles/pages/habits.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layouts/Layout";
import HabitsBox from "../components/organisms/HabitsBox";
import TitleAtoms from "../components/atoms/TitleAtoms";
import CreateHabit from "../components/organisms/CreateHabit";

const link = process.env.backLink;

function HabitsPage() {
  const [habitsData, setHabitsData] = useState([]);
  const token = useSelector((state) => state.user.token);

  // <=======> Fonction pour mettre a jour les habitudes faite <=======> \\

  const validHabits = async () => {
    try {
      const response = await fetch(`${link}/habits/valid`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de l'actualisation des tâches valid");
      }
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  // <=======> Fonction pour mettre a jour les habitudes non faite <=======> \\

  const unvalidHabits = async () => {
    try {
      const response = await fetch(`${link}/habits/unvalid`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de l'actualisation des tâches unvalid");
      }
      console.log("done");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    validHabits();
    unvalidHabits();
  }, []);

  // <=======> Fonction pour récupérer les données des habitudes <=======> \\

  const getHabits = async () => {
    try {
      const response = await fetch(`${link}/habits`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
        throw new Error("Erreur lors de la recupération des tâches");
      }
      setHabitsData(data.habits);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  // <=======> Fonction pour la traduction du label <=======> \\

  const translateLabel = (label) => {
    const translations = {
      days: "jour(s)",
      weeks: "semaine(s)",
      months: "mois",
      years: "an(s)",
    };
    return translations[label] || "Problem avec le label.";
  };

  // <=======> Trie des habitude par statut de favoris <=======> \\

  const favHabits = [];
  const habits = [];

  habitsData.forEach((data, i) => {
    if (data.isFavorite) {
      favHabits.push(
        <HabitsBox
          key={i}
          taskId={data._id}
          text={data.name}
          desc={data.description}
          start={data.startDate}
          end={data.endDate}
          level={data.difficulty}
          repNumber={data.repetition.number}
          labelTrad={translateLabel(data.repetition.label)}
          enLabel={data.repetition.label}
          fav={data.isFavorite}
          isDone={data.isDone}
          pause={data.onPauseSince}
          pauseEnd={data.PauseEndDate}
          pauseDesc={data.pauseDesc}
          refreshHabits={getHabits}
        />
      );
    } else {
      habits.push(
        <HabitsBox
          key={i}
          taskId={data._id}
          text={data.name}
          desc={data.description}
          start={data.startDate}
          end={data.endDate}
          level={data.difficulty}
          repNumber={data.repetition.number}
          labelTrad={translateLabel(data.repetition.label)}
          enLabel={data.repetition.label}
          fav={data.isFavorite}
          isDone={data.isDone}
          pause={data.onPauseSince}
          pauseEnd={data.PauseEndDate}
          pauseDesc={data.pauseDesc}
          refreshHabits={getHabits}
        />
      );
    }
  });

  return (
    <Layout>
      <div className={styles.content}>
        <TitleAtoms title={"Habitudes"} />

        <CreateHabit refreshHabits={getHabits} />
        <div className={styles.container}>
          {favHabits}
          {habits}
        </div>
      </div>
    </Layout>
  );
}
//
export default HabitsPage;
