const link = process.env.backLink;

// <=======> Fonction pour mettre a jour les habitudes faite <=======> \\

const validHabits = async (token) => {
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

const unvalidHabits = async (token) => {
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

module.exports = { unvalidHabits, validHabits };
