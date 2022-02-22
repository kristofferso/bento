const spellOutIngredient = (ingredient) => {
  return `${
    typeof ingredient?.quantity !== "undefined" && ingredient.quantity
  } ${(typeof ingredient?.unit !== "undefined" && ingredient.unit) || ""} ${
    ingredient.name
  }`;
};

export default spellOutIngredient;
