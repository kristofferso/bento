export default function DraggableIngredientList({
  ingredients,
  setIngredients,
}) {
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((i, num) => num !== index));
  };

  return (
    <ul className="">
      {ingredients.length > 0 &&
        ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="hover:bg-yellow-100 dark:hover:bg-yellow-700 rounded-sm cursor-move"
            draggable={true}
            onDragStart={(e, id) => {
              e.dataTransfer.setData("text/plain", index);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              const newList = [...ingredients];
              newList.splice(
                index,
                0,
                newList.splice(e.dataTransfer.getData("text/plain"), 1)[0]
              );
              setIngredients(newList);
            }}
          >
            <div className="inline-flex items-center gap-2 w-full px-2 py-1 justify-between ">
              <div className="flex gap-1 items-start">
                {ingredient.quantity && (
                  <span className="bg-gray-200 rounded-sm px-1 font-bold dark:bg-gray-700">
                    {ingredient.quantity}
                  </span>
                )}
                {ingredient.unit && (
                  <span className="border-b-2 border-black dark:border-gray-400">
                    {ingredient.unit}
                  </span>
                )}
                <span>{ingredient.name}</span>
              </div>
              <div
                className="cursor-pointer text-xs"
                onClick={() => {
                  handleRemoveIngredient(index);
                }}
              >
                🗑
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
