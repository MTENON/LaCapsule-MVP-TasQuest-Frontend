import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHabitData } from "../reducers/habits";
import {
  unvalidHabits,
  validHabits,
} from "../renov/functionsHabit/refreshHabits";
import styles from "../styles/pages/habits.module.css";
import Layout from "../components/layouts/Layout";
import TitleAtoms from "../components/atoms/TitleAtoms";
import CreateHabit from "../components/organisms/CreateHabit";
import Habit from "../renov/Habit";

const link = process.env.backLink;

function HabitsPage() {
  const token = useSelector((state) => state.user.token);
  const hab = useSelector((state) => state.habits.habitData);
  const dispatch = useDispatch();

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
      dispatch(updateHabitData(data.habits));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    unvalidHabits(token);
    validHabits(token);
    getHabits();
  }, []);

  console.log(hab);
  return (
    <Layout>
      <div className={styles.content}>
        <TitleAtoms title={"Habitudes"} width={"55%"} height={"13%"} />
        <CreateHabit refreshHabits={getHabits} />
        <Habit refreshHabits={getHabits} />
      </div>
    </Layout>
  );
}
//
export default HabitsPage;

// const [habitsData, setHabitsData] = useState([]);
// const token = useSelector((state) => state.user.token);

// useEffect(() => {
//   getHabits();
// }, []);

// // <=======> Trie des habitude par statut de favoris <=======> \\

// const favHabits = [];
// const habits = [];

// habitsData.forEach((data, i) => {
//   if (data.isFavorite) {
//     favHabits.push(
//       <HabitsBox
//         key={i}
//         taskId={data._id}
//         text={data.name}
//         desc={data.description}
//         start={data.startDate}
//         end={data.endDate}
//         level={data.difficulty}
//         repNumber={data.repetition.number}
//         labelTrad={translateLabel(data.repetition.label)}
//         enLabel={data.repetition.label}
//         fav={data.isFavorite}
//         isDone={data.isDone}
//         pause={data.onPauseSince}
//         pauseEnd={data.PauseEndDate}
//         pauseDesc={data.pauseDesc}
//         refreshHabits={getHabits}
//       />
//     );
//   } else {
//     habits.push(
//       <HabitsBox
//         key={i}
//         taskId={data._id}
//         text={data.name}
//         desc={data.description}
//         start={data.startDate}
//         end={data.endDate}
//         level={data.difficulty}
//         repNumber={data.repetition.number}
//         labelTrad={translateLabel(data.repetition.label)}
//         enLabel={data.repetition.label}
//         fav={data.isFavorite}
//         isDone={data.isDone}
//         pause={data.onPauseSince}
//         pauseEnd={data.PauseEndDate}
//         pauseDesc={data.pauseDesc}
//         refreshHabits={getHabits}
//       />
//     );
//   }
// });

// return (
//   <Layout>
//     <div className={styles.content}>
//       <TitleAtoms title={"Habitudes"} />
//       <CreateHabit refreshHabits={getHabits} />
//       <div className={styles.container}>
//         {favHabits}
//         {habits}
//       </div>
//     </div>
//   </Layout>
// );
