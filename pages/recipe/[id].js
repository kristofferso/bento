import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Avatar from "../../components/Avatar";
import Pill from "../../components/elements/Pill";
import { supabase } from "../../utils/supabase";
import { recipeLevelText } from "../../utils/recipeEnums";
import { useUser } from "../../context/user";
import { generateHTML } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Mention from "@tiptap/extension-mention";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import RecipeReadOnlyEditor from "../../components/RecipeReadOnlyEditor";
import HorizontalLine from "../../components/elements/HorizontalLine";

export default function RecipeDetails({ recipe }) {
  const [authorData, setAuthorData] = useState();
  const [recipeLikes, setRecipeLikes] = useState({ count: 0 });
  const [like, setLike] = useState(false);
  const { user } = useUser();

  const renderedDescription = useMemo(() => {
    try {
      const json = JSON.parse(recipe.description);

      return generateHTML(json, [
        Document,
        Paragraph,
        Text,
        ListItem,
        OrderedList,
        BulletList,
        Mention.configure({
          HTMLAttributes: {
            class: "px-1.5 rounded-sm bg-gray-200",
          },
          renderLabel({ node }) {
            return `${node.attrs.label ?? node.attrs.id}`;
          },
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, [recipe]);

  const handleLike = async () => {
    if (!like) {
      const { data, error } = await supabase
        .from("likes")
        .insert([{ recipe_id: recipe.id, user_id: user.id }]);
      setLike(true);
      setRecipeLikes({ ...recipeLikes, count: recipeLikes.count + 1 });
    } else {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .match({ recipe_id: recipe.id, user_id: user.id });
      setLike(false);
      setRecipeLikes({ ...recipeLikes, count: recipeLikes.count - 1 });
    }
  };

  useEffect(() => {
    const getAuthorData = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", recipe.user_id)
        .single();
      setAuthorData(data);
    };
    const getRecipeLikes = async () => {
      const { data, error } = await supabase
        .from("recipes_likes")
        .select("count")
        .eq("id", recipe.id)
        .maybeSingle();

      if (!data) {
        setRecipeLikes({ count: 0 });
      } else {
        setRecipeLikes(data);
      }
    };

    const getUserLike = async () => {
      const { data } = await supabase
        .from("likes")
        .select("id")
        .match({ user_id: user.id, recipe_id: recipe.id })
        .maybeSingle();
      if (data) {
        setLike(true);
      }
    };

    getAuthorData();
    getRecipeLikes();
    if (user) getUserLike();
  }, [recipe, user]);

  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      <div className="flex items-stretch md:items-center flex-col md:flex-row justify-between gap-6 flex-wrap md:flex-nowrap ">
        <div className="flex flex-col gap-3">
          <h1 className="">{recipe.title}</h1>
          <div className="flex gap-2">
            <Pill>{recipe.duration} minutter</Pill>
            <Pill>{recipeLevelText(recipe.level)}</Pill>
          </div>
        </div>
        <div className="flex flex-row-reverse md:flex-col-reverse items-center md:items-end gap-x-8 gap-y-4 flex-grow md:flex-grow-0 justify-between border-t-2 border-black dark:border-white -mx-4 px-4 pt-4 md:border-t-0 md:mx-0 md:p-0">
          <div className="flex items-center gap-2">
            {recipeLikes && (
              <Pill>
                <FontAwesomeIcon icon={faHeart} /> {recipeLikes.count}
              </Pill>
            )}
            {user && (
              <button
                className="button-sm button-secondary-sm bg-gray-200"
                onClick={handleLike}
              >
                {like ? (
                  <span className="flex items-center gap-2">
                    Liker <FontAwesomeIcon icon={faCheck} />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Lik <FontAwesomeIcon icon={faHeart} />
                  </span>
                )}
              </button>
            )}
          </div>

          {authorData && (
            <div className="flex items-center gap-4">
              <div className="flex flex-col justify-start">
                <p className="">Skrevet av</p>
                <h4 className="">{authorData.display_name}</h4>
              </div>
              {authorData.avatar_url && (
                <Avatar
                  src={authorData.avatar_url}
                  alt="Forfatter avatar"
                  size="sm"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {recipe.image_url ? (
        <div className="h-80 w-auto -mx-4 md:mx-0 relative md:rounded-sm overflow-hidden border-y-2 border-black dark:border-white md:border-2">
          <Image
            src={recipe.image_url}
            alt={`Bilde av ${recipe.title}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <HorizontalLine className="mb-4 md:my-6 -mx-4" />
      )}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <h2 className="">Ingredienser</h2>
          <ul className="list-disc list-inside py-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{`${ingredient.quantity || ""} ${
                ingredient.unit || ""
              } ${ingredient.name}`}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="">Fremgangsmåte</h2>
          <RecipeReadOnlyEditor
            editorContent={renderedDescription}
            dependencies={[recipe]}
          />
        </div>
      </div>
    </div>
  );
}

// For static path generation

// export const getStaticPaths = async () => {
//   const { data: recipes } = await supabase
//     .from("recipes_approved")
//     .select("id");

//   const paths = recipes.map(({ id }) => ({ params: { id: id.toString() } }));
//   return { paths, fallback: false };
// };

export const getServerSideProps = async ({ params }) => {
  const { data: recipe } = await supabase
    .from("recipes_approved")
    .select("*")
    .eq("id", params.id)
    .single();

  return { props: { recipe } };
};
