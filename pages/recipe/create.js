import Mention from "@tiptap/extension-mention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { useUser } from "../../context/user";
import suggestion from "../../utils/editor/suggestion";
import DraggableIngredientList from "./../../components/DraggableIngredientList";
import { supabase } from "./../../utils/supabase";

export default function Create() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDuration, setRecipeDuration] = useState(20);
  const [recipePortions, setRecipePortions] = useState(2);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState();
  const [editorContent, setEditorContent] = useState("<p>Hello World!</p>");
  const [showIngredientTip, setShowIngredientTip] = useState(true);

  const { user } = useUser();

  const handleSubmit = async () => {
    if (
      recipeTitle === "" ||
      !recipeDuration ||
      !recipePortions ||
      ingredients.length < 1 ||
      editorContent === ""
    ) {
      console.log("error");
    } else {
      const { data, error } = await supabase.from("recipes").insert([
        {
          title: recipeTitle,
          duration: recipeDuration,
          portions: recipePortions,
          ingredients,
          description: editorContent,
          user_id: user.id,
          is_approved: false,
        },
      ]);

      console.log(data, error);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (newIngredient !== "") {
      let quantity, unit, name;

      const fullMatch = newIngredient.match(
        /(\d[\d\s\/,]{0,3})\s{0,1}([A-ø]{1,9})\s(.*)/
      );
      console.log(fullMatch);
      if (fullMatch) {
        [, quantity, unit, name] = fullMatch;
      } else {
        const nameQuantityMatch = newIngredient.match(
          /(\d[\d\s\/,]{0,3})\s(.*)/
        );
        console.log(nameQuantityMatch);
        if (nameQuantityMatch) {
          [, quantity, name] = nameQuantityMatch;
        } else {
          const nameOnlyMatch = newIngredient.match(/(.*)/);
          if (nameOnlyMatch) {
            [, name] = nameOnlyMatch;
          } else {
            console.log("NO Match");
          }
        }
      }

      const ingredientObject = {
        name,
        unit,
        quantity,
        inputText: newIngredient,
      };

      setIngredients([...ingredients, ingredientObject]);
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
            return `${node.attrs.label ?? node.attrs.id}`;
          },
          suggestion: {
            char: "+",
            render: suggestion.render,
            items: ({ query }) => {
              console.log(ingredients.filter((item) => item.name));
              return ingredients
                .map((item) => item.name)
                .filter((item) => {
                  return item.toLowerCase().startsWith(query.toLowerCase());
                })
                .slice(0, 5);
            },
          },
        }),
      ],
      content: editorContent,
      onUpdate: ({ editor }) => {
        setEditorContent(editor.getJSON());
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
            className="w-96"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />
        </InputLabel>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <InputLabel title="Tid" helperText="Hvor lang tid tar det å lage?">
            <input
              type="number"
              className="w-16"
              value={recipeDuration}
              onChange={(e) => setRecipeDuration(parseInt(e.target.value))}
            />
            <span className="ml-3">minutter</span>
          </InputLabel>
          <InputLabel
            title="Porsjoner"
            helperText="Hvor mange porsjoner blir det?"
          >
            <div className="flex gap-1">
              <button
                className="button-secondary"
                onClick={() =>
                  setRecipePortions(
                    (recipePortions > 0 ? recipePortions : 1) - 1
                  )
                }
              >
                -
              </button>
              <input
                type="text"
                value={recipePortions}
                className="w-20 text-center"
                onChange={(e) => setRecipePortions(parseInt(e.target.value))}
              />
              <button
                className="button-secondary"
                onClick={() =>
                  setRecipePortions(
                    (recipePortions < 12 ? recipePortions : 11) + 1
                  )
                }
              >
                +
              </button>
            </div>
          </InputLabel>
        </div>
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
            <div className="flex gap-2 justify-between items-center text-sm py-2 px-3 bg-gray-100 dark:bg-gray-700">
              <p>
                Mengde og eventuell måleenhet gjenkjennes automatisk, for
                eksempel med <span className="italic">4 tomater</span> eller
                <span className="italic"> 550 gram hvetemel</span>. Ingredienser
                uten mengde, som{" "}
                <span className="italic">en klunk olivenolje</span> eller{" "}
                <span className="italic">litt salt og pepper</span> gjenkjennes
                også.
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setShowIngredientTip(false)}
              >
                ✖️
              </p>
            </div>
          )}
          <form
            className="flex gap-2 items-end mb-2 flex-wrap"
            onSubmit={handleAddIngredient}
          >
            <input
              type="text"
              value={newIngredient}
              className="max-w-[360px] w-48 flex-1"
              required
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
            />

            <button type="submit" className="flex-shrink-0">
              Legg til
            </button>
          </form>
        </div>

        <DraggableIngredientList
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </div>
      <div className="">
        <h2 className="">Fremgangsmåte</h2>
        <p className="text-sm">
          Bruk{" "}
          <span className="font-bold px-1 bg-gray-100 dark:text-black">+</span>
          -tasten for å legge inn ingrediensene direkte i teksten. Da blir det
          enkelt å se riktig mengde for den som leser!
        </p>
        <EditorContent editor={editor} />
      </div>
      <button onClick={() => handleSubmit()}>Opprett</button>
    </div>
  );
}

const InputLabel = ({ title, children, ...props }) => (
  <>
    <label htmlFor="" className="">
      <p className="font-medium">{title}</p>
      {props.helperText && <p className="text-sm mb-1.5">{props.helperText}</p>}
      {children}
    </label>
  </>
);
