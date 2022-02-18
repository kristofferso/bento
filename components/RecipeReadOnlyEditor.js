import Mention from "@tiptap/extension-mention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RecipeReadOnlyEditor({ editorContent, dependencies }) {
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
            class: "px-1.5 rounded-sm bg-gray-200",
          },
          renderLabel({ node }) {
            return `${node.attrs.label ?? node.attrs.id}`;
          },
        }),
      ],
      content: editorContent,
    },
    [...dependencies]
  );

  return <EditorContent editor={editor} />;
}
