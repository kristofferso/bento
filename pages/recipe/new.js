import {
  faExclamationTriangle,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mention from "@tiptap/extension-mention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Notice from "../../components/elements/Notice";
import Stepper from "../../components/elements/Stepper";
import { useUser } from "../../context/user";
import suggestion from "../../utils/editor/suggestion";
import DraggableIngredientList from "../../components/DraggableIngredientList";
import { supabase } from "../../utils/supabase";
import ToggleTag from "../../components/elements/ToggleTag";
import recipeTagList from "../../utils/recipeTagList";

export default function New() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDuration, setRecipeDuration] = useState(20);
  const [recipePortions, setRecipePortions] = useState(2);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipeTags, setRecipeTags] = useState([]);
  const [editorContent, setEditorContent] = useState(
    "<p>Her forklarer du hvordan du går frem for å lage oppskriften...</p>"
  );
  const [showIngredientTip, setShowIngredientTip] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [dbError, setDbError] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    setInputError(false);
    setDbError(false);
    if (
      recipeTitle === "" ||
      !recipeDuration ||
      !recipePortions ||
      ingredients.length < 1 ||
      editorContent === "" ||
      recipeTags.length < 1
    ) {
      setInputError(true);
    } else {
      const { error } = await supabase.from("recipes").insert([
        {
          title: recipeTitle,
          duration: recipeDuration,
          portions: recipePortions,
          ingredients,
          description: editorContent,
          user_id: user.id,
          tags: recipeTags,
          is_approved: false,
        },
      ]);

      if (error) {
        console.log(error);
        setDbError(true);
      } else {
        router.push("/recipe/success");
      }
    }
  };

  const handleParseIngredient = (ingredient, ingredientId) => {
    let quantity, unit, name;

    const fullMatch = ingredient.match(
      /(\d[\d\s\/,\.]{0,3})\s{0,1}(\w{0,9}(liter|gram|gr|gr\.|skjeer|skje|mål)|((kilo|kopp|boks|stk|stykk|fedd|klype|klyp|kvast|kvist|bunt)(er|\.|.{0}))|\w{0,1}s|\w{0,1}l|\w{0,1}g)\s(.*)/
    );
    if (fullMatch) {
      [, quantity, unit, , , , , name] = fullMatch;
    } else {
      const nameQuantityMatch = ingredient.match(/(\d[\d\s\/,\.]{0,3})\s(.*)/);

      if (nameQuantityMatch) {
        [, quantity, name] = nameQuantityMatch;
      } else {
        const nameOnlyMatch = ingredient.match(/(.*)/);
        if (nameOnlyMatch) {
          [, name] = nameOnlyMatch;
        } else {
          console.log("No match for", ingredient);
        }
      }
    }

    if (quantity) {
      quantity = parseFloat(quantity.replace(",", "."));
    }

    name = name.trim();

    const ingredientObject = {
      id: ingredientId,
      name,
      unit,
      quantity,
      inputText: ingredient,
    };

    return ingredientObject;
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      const newIngredientId = ingredients.length + 1;
      setIngredients([
        ...ingredients,
        handleParseIngredient(newIngredient, newIngredientId),
      ]);
      setNewIngredient("");
    }
  };

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          blockquote: false,
          codeBlock: false,
          code: false,
          heading: false,
          bulletList: {
            HTMLAttributes: { class: "list-disc ml-4" },
          },
          orderedList: {
            HTMLAttributes: { class: "list-decimal ml-4" },
          },
        }),
        Mention.configure({
          HTMLAttributes: {
            class: "px-1.5 rounded-sm bg-gray-200",
          },
          renderLabel({ node }) {
            console.log(node);
            return `${node.attrs.label ?? node.attrs.id}`;
          },
          suggestion: {
            render: suggestion.render,
            items: ({ query }) => {
              const res = ingredients
                .filter((item) => {
                  return item.name.toLowerCase().includes(query.toLowerCase());
                })
                .slice(0, 5);
              return res;
            },
          },
        }),
      ],
      content: editorContent,
      onUpdate: ({ editor }) => {
        setEditorContent(editor.getJSON());
        console.log(
          "used ingredients",
          editor
            .getJSON()
            .content.map((line) => {
              if ("content" in line && line.content.length > 0) {
                return line.content.filter(
                  (item) => item?.attrs?.["id"] && item.type === "mention"
                );
              }
            })
            .filter((line) => line)
            .flat()
            .map((line) => line.attrs.id)
        );
      },
      editorProps: {
        attributes: {
          class:
            "p-4 rounded-sm border-2 border-black dark:border-white focus:outline-none min-h-[300px] mt-4",
        },
      },
    },
    [ingredients]
  );

  return (
    <div className="flex flex-col gap-8 px-4">
      <h1>Ny lunsjoppskrift</h1>
      <div className="flex flex-col gap-4">
        <h2 className="">Om oppskriften</h2>
        <InputLabel
          title="Tittel"
          helperText="En tittel som gjør at folk vil lage retten din!"
        >
          <input
            type="text"
            className="w-96 max-w-full"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />
        </InputLabel>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <InputLabel title="Tid" helperText="Hvor lang tid tar det å lage?">
            <select
              className="w-18"
              value={recipeDuration}
              onChange={(e) => setRecipeDuration(parseInt(e.target.value))}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="60">60+</option>
            </select>

            <span className="ml-3">minutter</span>
          </InputLabel>
          <InputLabel
            title="Porsjoner"
            helperText="Hvor mange porsjoner blir det?"
          >
            <Stepper
              handleDecrease={() =>
                setRecipePortions((recipePortions > 0 ? recipePortions : 1) - 1)
              }
              handleIncrease={() =>
                setRecipePortions(
                  (recipePortions < 12 ? recipePortions : 11) + 1
                )
              }
              handleChange={(e) => setRecipePortions(parseInt(e.target.value))}
              value={recipePortions}
            />
          </InputLabel>
        </div>
        <InputLabel
          title="Type oppskrift"
          helperText="Velg opptil 3 som passer din rett"
        >
          <div className="flex flex-wrap gap-2 ">
            {recipeTagList.map((tag, i) => {
              const selected = recipeTags.includes(tag);

              return (
                <ToggleTag
                  key={i}
                  label={tag}
                  selected={selected}
                  color="blue"
                  onClick={() => {
                    if (selected) {
                      setRecipeTags([...recipeTags].filter((i) => i !== tag));
                    } else {
                      setRecipeTags([...recipeTags, tag].slice(-3));
                    }
                  }}
                />
              );
            })}
          </div>
        </InputLabel>
      </div>
      <div className="">
        <h2 className="mb-2">Ingredienser</h2>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex gap-2 items-center">
            <p className="">Legg til ingrediens</p>
            <button
              className="button-secondary-sm"
              onClick={() => setShowIngredientTip(!showIngredientTip)}
            >
              ?
            </button>
          </div>
          {showIngredientTip && (
            <Notice>
              <p className="text-sm">
                Mengde og eventuell måleenhet gjenkjennes automatisk, for
                eksempel med <span className="italic">4 tomater</span> eller
                <span className="italic"> 550 gram hvetemel</span>. Ingredienser
                uten mengde, som{" "}
                <span className="italic">en klunk olivenolje</span> eller{" "}
                <span className="italic">litt salt og pepper</span> gjenkjennes
                også.
              </p>
              <p
                className="cursor-pointer text-xl"
                onClick={() => setShowIngredientTip(false)}
              >
                <FontAwesomeIcon icon={faTimesSquare} />
              </p>
            </Notice>
          )}
          <div className="flex gap-2 items-end mb-2 flex-wrap">
            <input
              type="text"
              value={newIngredient}
              className="max-w-[360px] w-48 flex-1"
              required
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
              onPaste={(e) => {
                e.preventDefault();
                const newIngredientId = ingredients.length + 1;
                const list = e.clipboardData.getData("text/plain").split("\n");
                const parsed = list
                  .map((item, index) => {
                    return handleParseIngredient(item, newIngredientId + index);
                  })
                  .filter((ingredient) => ingredient.name);
                setIngredients([...ingredients, ...parsed]);
              }}
            />

            <button
              type="submit"
              className="flex-shrink-0"
              onClick={handleAddIngredient}
            >
              Legg til
            </button>
          </div>
        </div>

        <DraggableIngredientList
          ingredients={ingredients}
          setIngredients={setIngredients}
          editorContent={editorContent}
        />
      </div>
      <div className="">
        <h2 className="">Fremgangsmåte</h2>
        <p className="text-sm">
          Bruk{" "}
          <span className="font-bold px-1 bg-gray-100 dark:text-black">@</span>
          -tasten for å legge inn ingrediensene direkte i teksten. Da blir det
          enkelt å se riktig mengde for den som leser!
        </p>
        <EditorContent editor={editor} />
      </div>
      <button onClick={() => handleSubmit()}>Opprett</button>
      {(inputError || dbError) && (
        <Notice type="error">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {inputError
            ? "Du mangler noen felter før du kan opprette oppskriften. Har du fylt inn alle?"
            : "Det skjedde noe feil ved opprettelse av oppskriften, men det er ikke din feil!"}
        </Notice>
      )}
    </div>
  );
}

const InputLabel = ({ title, children, ...props }) => (
  <>
    <label htmlFor={title} className="">
      <p className="font-medium">{title}</p>
      {props.helperText && <p className="text-sm mb-1.5">{props.helperText}</p>}
      {children}
    </label>
  </>
);

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permament: false,
        destination: "/?login=true",
      },
      props: {},
    };
  }

  return { props: {} };
};
