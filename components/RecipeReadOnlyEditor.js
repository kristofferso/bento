import Mention from "@tiptap/extension-mention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import spellOutIngredient from "../utils/spellOutIngredient";

export default function RecipeReadOnlyEditor({ editorContent, ingredients }) {
  const editor = useEditor(
    {
      editable: false,
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
            class: "px-1.5 rounded-sm bg-gray-200 dark:bg-gray-700",
          },
          renderLabel({ node }) {
            const ingredient = ingredients.filter(
              (ingredient) => ingredient.id === node.attrs.id
            )[0];
            return spellOutIngredient(ingredient);
          },
        }),
      ],
      content: editorContent,
    },
    [ingredients]
  );

  return <EditorContent editor={editor} />;
}
