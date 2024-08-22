// <=======> Fonction pour la traduction du label <=======> \\

const translate = (label) => {
  const translations = {
    days: "jour(s)",
    weeks: "semaine(s)",
    months: "mois",
    years: "an(s)",
  };
  return translations[label] || "Problem avec le label.";
};

module.exports = { translate };
