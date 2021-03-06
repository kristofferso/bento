const spellOutIngredient = (ingredient) => {
  return `${ingredient.quantity ? ingredient.quantity + " " : ""}${
    ingredient.unit ? ingredient.unit + " " : ""
  }${ingredient.name}`;
};

export default spellOutIngredient;
