import React, {useEffect, useState} from "react";
import Axios from "axios";

function SnippetEditor({getSnippets, setSnippetEditorOpen, editSnippetData}) {

    // store editor state values
    const [editorTitle, setEditorTitle] = useState("");
    const [editorDescription, setEditorDescription] = useState("");
    const [editorCode, setEditorCode] = useState("");

    useEffect(() => {
        if (editSnippetData) {
            setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
            setEditorDescription(editSnippetData.description ? editSnippetData.description : "");
            setEditorCode(editSnippetData.code ? editSnippetData.code : "");
        }
    }, [editSnippetData]);

    async function saveClipboard(e) {
        e.preventDefault();

        const snippetData = {
            title: editorTitle ? editorTitle : undefined,
            description: editorDescription ? editorDescription : undefined,
            code: editorCode ? editorCode : undefined
        };

        // avoid creating a new snippet from an edit
            // rather the older version is replaced on a save, via put request, as an update
        if (!editSnippetData) {
            await Axios.post("http://localhost:5000/snippet/", snippetData);
        }
        else {
            await Axios.put(`http://localhost:5000/snippet/${editSnippetData._id}`, snippetData);
        }

        getSnippets();
        closeEditor();
    }

    // users may not want every clipboard to save, they must be able to cancel
    function closeEditor() {
        setSnippetEditorOpen(false);
        setEditorTitle("");
        setEditorDescription("");
        setEditorCode("");
    }

    return (
        <div className = "snippet-editor">
            <form onSubmit = {saveClipboard}>
                <label htmlFor = "editor-title">Title</label>
                <input 
                    id = "editor-title" 
                    type = "text" 
                    value = {editorTitle} 
                    onChange = {(e) => setEditorTitle(e.target.value)}
                />

                <label htmlFor = "editor-description">Description</label>
                <input 
                    id = "editor-description" 
                    type = "text" 
                    value = {editorDescription}
                    onChange = {(e) => setEditorDescription(e.target.value)}
                />

                <label htmlFor = "editor-code">Code</label>
                <textarea 
                    id = "editor-code"
                    value = {editorCode}
                    onChange = {(e) => setEditorCode(e.target.value)}
                />

                {/* save the snippet */}
                <button type = "submit">Save clipboard</button>

                {/* cancel the snippet editor */}
                <button type = "button" onClick = {closeEditor}>Cancel</button>

            </form>
        </div>
    );
}

export default SnippetEditor;