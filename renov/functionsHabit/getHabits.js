// <=======> Fonction pour récupérer les données des habitudes <=======> \\

const link = process.env.backLink;

const getHabits = async (token, func) => {
    console.log('Get habits fonctoniel');
    
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
    func(data.habits);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getHabits };