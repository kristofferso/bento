const spellOutIngredient = (ingredient) => {
  return `${ingredient.quantity || ""} ${ingredient.unit || ""} ${
    ingredient.name
  }`;
};

export default spellOutIngredient;
