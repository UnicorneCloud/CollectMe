export const getFrequence = (feature) => {

  return true;
};

export const getWeekDay = (frenchDay) => {
  switch (frenchDay) {
    case lundi:
      return "Monday";
    case mardi:
      return "Tuesday";
    case mercredi:
      return "Wednesday";
    case jeudi:
      return "Thursday";
    case vendredi:
      return "Friday";
    case samedi:
      return "Saturday";
    case dimanche:
      return "Sunday";
    default:
      return "la semaine des 4 jeudis"
  }
};