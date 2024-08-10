import { useEffect, useState } from "react";
import styles from "../styles/pages/habits.module.css";
import Layout from "../components/layouts/Layout";
import HabitsBox from "../components/organisms/HabitsBox";
import { useSelector } from "react-redux";
import TitleAtoms from "../components/atoms/TitleAtoms";
import ButtonDiamond from "../components/atoms/ButtonDiamond";

const link = process.env.backLink;

function HabitsPage() {
  const [habitsData, setHabitsData] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(`${link}/habits`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!data.result) {
          throw new Error("Erreur lors de la recupération des tâche");
        }

        setHabitsData(data.habits);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHabits();
  }, []);

  console.log(habitsData);

  const habits = habitsData.map((data) => {
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
        key={data.taskId}
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
        pause={data.onPauseSince}
        pauseEnd={data.PauseEndDate}
        pauseDesc={data.pauseDesc}
      />
    );
  });

  return (
    <Layout>
      <div className={styles.content}>
        <TitleAtoms title={"Habitudes"} />
        <ButtonDiamond
          icon="mingcute:cross-fill"
          // func={handleOpen}
          variant="primaryS"
          iconSize="iconSize"
        ></ButtonDiamond>       
        <div className={styles.container}>{habits}</div>
      </div>
    </Layout>
  );
}

export default HabitsPage;

// const habitsData = [
//     {
//       text: "test de fausse habitude 1",
//       repeat: "tous les 1 jours",
//       taskId: "66b4ba43f2f32d576720ea37",
//       variant: "primary",
//     },
//     {
//       text: "test de fausse habitude 2",
//       repeat: "tous les 2 jours",
//       taskId: "66b4ba4ef2f32d576720ea3c",
//       variant: "primary",
//     },
//     {
//       text: "test de fausse habitude 3",
//       repeat: "tous les 3 jours",
//       taskId: "66b4ba56f2f32d576720ea41",
//       variant: "primary",
//     },
//     {
//       text: "test de fausse habitude 4",
//       repeat: "tous les 4 jours",
//       taskId: "66b4ba62f2f32d576720ea46",
//       variant: "primary",
//     },
//   ];

//   const habits = habitsData.map((data, i) => {
//     return <HabitsBox key={data.taskId} {...data} />;
//   });

// {habits}
