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

  const Habits = async () => {
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

  const fetchH = async () => {
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

  module.exports = { fetchHabits };