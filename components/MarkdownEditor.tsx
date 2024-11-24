import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

// Dynamically import the Editor component to avoid SSR issues
const Editor = dynamic(() => import("@toast-ui/react-editor").then((mod) => mod.Editor), {
    ssr: false,
});

// Define the prop types for MarkdownEditor
interface MarkdownEditorProps {
    value: string;
    onChange: (markdown: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
    const editorInstanceRef = useRef<any>(null);

    useEffect(() => {
        // Synchronize the value prop with the editor content
        if (editorInstanceRef.current) {
            const currentMarkdown = editorInstanceRef.current.getMarkdown();
            if (currentMarkdown !== value) {
                editorInstanceRef.current.setMarkdown(value || "");
            }
        }
    }, [value]);

    const handleEditorChange = () => {
        if (editorInstanceRef.current) {
            const markdown = editorInstanceRef.current.getMarkdown();
            onChange(markdown); // Pass updated Markdown content to the parent
        }
    };

    return (
        <div>
            <Editor
                initialValue={value || ""}
                previewStyle="vertical"
                height="800px"
                initialEditType="markdown"
                useCommandShortcut={true}
                events={{
                    change: handleEditorChange,
                }}
                onLoad={(instance: any) => {
                    editorInstanceRef.current = instance; // Save the editor instance
                }}
            />
        </div>
    );
};

export default MarkdownEditor;
