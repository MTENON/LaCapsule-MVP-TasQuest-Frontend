import styles from "../styles/Habit.module.css";
import { useSelector } from "react-redux";
import HabitsBox from "../components/organisms/HabitsBox";
import { translate } from "./functionsHabit/translate";



function Habit({ refreshHabits }) {
  const habitsData = useSelector((state) => state.habits.habitData);

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
          labelTrad={translate(data.repetition.label)}
          enLabel={data.repetition.label}
          fav={data.isFavorite}
          isDone={data.isDone}
          pause={data.onPauseSince}
          pauseEnd={data.PauseEndDate}
          pauseDesc={data.pauseDesc}
          refreshHabits={refreshHabits}
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
          labelTrad={translate(data.repetition.label)}
          enLabel={data.repetition.label}
          fav={data.isFavorite}
          isDone={data.isDone}
          pause={data.onPauseSince}
          pauseEnd={data.PauseEndDate}
          pauseDesc={data.pauseDesc}
          refreshHabits={refreshHabits}
        />
      );
    }
  });

  return (
    <>
      <div className={styles.container}>
        {favHabits}
        {habits}
      </div>
    </>
  );
}

export default Habit;
