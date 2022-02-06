import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Pill from "../../components/elements/Pill";
import { supabase } from "../../utils/supabase";
import { recipeLevelText } from "../../utils/recipeEnums";

export default function RecipeDetails({ recipe }) {
  const [authorData, setAuthorData] = useState();

  const getAuthorData = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", recipe.user_id)
      .single();
    setAuthorData(data);
  };

  useEffect(() => {
    getAuthorData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="">{recipe.title}</h1>
          <div className="flex gap-2">
            <Pill>{recipe.duration} minutter</Pill>
            <Pill>{recipeLevelText(recipe.level)}</Pill>
          </div>
        </div>
        {authorData && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col justify-start">
              <p className="">Skrevet av</p>
              <h4 className="">{authorData.display_name}</h4>
            </div>
            <Avatar
              src={authorData?.avatar_url}
              alt="Forfatter avatar"
              size="sm"
            />
          </div>
        )}
      </div>
      {recipe.image_url && (
        <div className="h-80 w-auto relative object-cover -mx-4 md:mx-0 md:rounded-md overflow-hidden">
          <Image
            src={recipe.image_url}
            alt={`Bilde av ${recipe.title}`}
            layout="fill"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <h2 className="">Ingredienser</h2>
          <ul className="list-disc list-inside py-2">
            <li>Brød</li>
            <li>Test</li>
            <li>Test</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="">Fremgangsmåte</h2>
          <p className="">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const { data: recipes } = await supabase.from("recipes").select("id");

  const paths = recipes.map(({ id }) => ({ params: { id: id.toString() } }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { data: recipe } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.id)
    .single();

  return { props: { recipe } };
};
