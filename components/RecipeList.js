import Image from "next/image";
import Link from "next/link";
import Pill from "./elements/Pill";
import { recipeLevelText } from "../utils/recipeEnums";

export default function RecipeList({ recipes, ...props }) {
  return (
    <div className="flex flex-row flex-wrap gap-4 px-4" ref={props.scrollRef}>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          // eslint-disable-next-line @next/next/link-passhref
          <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
            <a className="rounded-sm flex-grow min-w-[16rem] basis-1 overflow-hidden border-2 border-black dark:border-white hover:bg-slate-100 hover:dark:bg-gray-800">
              {recipe.image_url && (
                <div className="relative h-32 w-auto border-b-2 border-black dark:border-white">
                  <Image
                    src={recipe.image_url}
                    alt={`Bilde av ${recipe.title}`}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col p-6 gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="">{recipe.title}</h3>
                  <p className="text-lg">→</p>
                </div>
                <div className="flex gap-2">
                  <Pill>{recipe.duration} min</Pill>
                  <Pill>{recipeLevelText(recipe.level)}</Pill>
                </div>
              </div>
            </a>
          </Link>
        ))
      ) : (
        <p className="mt-4 text-center w-full">Ingen treff</p>
      )}
    </div>
  );
}
