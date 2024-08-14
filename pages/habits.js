import { useEffect, useState } from "react";
import styles from "../styles/pages/habits.module.css";
import Layout from "../components/layouts/Layout";
import HabitsBox from "../components/organisms/HabitsBox";
import { useSelector } from "react-redux";
import TitleAtoms from "../components/atoms/TitleAtoms";
import CreateHabit from "../components/organisms/CreateHabit";

const link = process.env.backLink;

function HabitsPage() {
  const [habitsData, setHabitsData] = useState([]);
  const token = useSelector((state) => state.user.token);

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

  const getHabits = async () => {
    console.log("coucou");

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

  // console.log(habitsData);

  // const handleRefresh = () => {
  //   console.log("refreshed");
  //   setHabitsData([]);
  // };

  const habits = habitsData.map((data, i) => {
    let labelTrad = "";
    switch (data.repetition.label) {
      case "days":
        labelTrad = "jour(s)";
        break;
      case "weeks":
        labelTrad = "semaine(s)";
        break;
      case "months":
        labelTrad = "mois";
        break;
      case "years":
        labelTrad = "année(s)";
        break;
      default:
        console.log(`problem avec le label.`);
    }
    return (
      <HabitsBox
        key={i}
        taskId={data._id}
        text={data.name}
        desc={data.description}
        start={data.startDate}
        end={data.endDate}
        level={data.difficulty}
        repNumber={data.repetition.number}
        labelTrad={labelTrad}
        enLabel={data.repetition.label}
        fav={data.isFavorite}
        isDone={data.isDone}
        pause={data.onPauseSince}
        pauseEnd={data.PauseEndDate}
        pauseDesc={data.pauseDesc}
        refreshHabits={getHabits}
      />
    );
  });

  return (
    <Layout>
      <div className={styles.content}>
        <TitleAtoms title={"Habitudes"} />
        <CreateHabit refreshHabits={getHabits} />
        <div className={styles.container}>{habits}</div>
      </div>
    </Layout>
  );
}

export default HabitsPage;
