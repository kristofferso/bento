export const recipeLevelText = (level) => {
  switch (level) {
    case 1:
      return "Enkel";
    case 2:
      return "Middels";
    case 3:
      return "Vanskelig";
    default:
      return "";
  }
};
