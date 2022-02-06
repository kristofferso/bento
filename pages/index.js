import Image from "next/image";
import Link from "next/link";
import Pill from "../components/elements/Pill";
import { recipeLevelText } from "../utils/recipeEnums";
import { supabase } from "../utils/supabase";

export default function Home({ recipes }) {
  return (
    <>
      <ul className="flex flex-row flex-wrap gap-4">
        {recipes.map((recipe) => (
          // eslint-disable-next-line @next/next/link-passhref
          <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
            <a
              className="bg-gray-100 rounded-lg flex-grow basis-1 overflow-hidden hover:bg-gray-200"
              style={{ minWidth: "15rem" }}
            >
              <li>
                {recipe.image_url && (
                  <div className="relative h-32 w-auto">
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
                    <p className="">{recipe.title}</p>
                    <p className="text-lg">→</p>
                  </div>
                  <div className="flex gap-2">
                    <Pill>{recipe.duration} min</Pill>
                    <Pill>{recipeLevelText(recipe.level)}</Pill>
                  </div>
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = async () => {
  const { data: recipes } = await supabase.from("recipes").select("*");

  return { props: { recipes } };
};
