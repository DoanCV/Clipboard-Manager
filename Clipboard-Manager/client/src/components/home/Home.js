import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Snippet from "./Snippet";

function Home() {

    // empty array otherwise defaults to undefined
    const [snippets, setSnippets] = useState([]);

    // bool to check editor state, not open by default
    const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);

    // store editor state values
    const [editorTitle, setEditorTitle] = useState("");
    const [editorDescription, setEditorDescription] = useState("");
    const [editorCode, setEditorCode] = useState("");

    useEffect(() => {
        getSnippets();
    }, []);

    async function getSnippets() {
        const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
        setSnippets(snippetsRes.data);
    }

    async function saveClipboard(e) {
        e.preventDefault();

        const snippetData = {
            title: editorTitle ? editorTitle : undefined,
            description: editorDescription ? editorDescription : undefined,
            code: editorCode ? editorCode : undefined
        };

        await Axios.post("http://localhost:5000/snippet/", snippetData);

        getSnippets();
        closeEditor();
    }

    // users may not want every clipboard to save, they must be able to cancel
    function closeEditor() {
        setNewSnippetEditorOpen(false);
        setEditorTitle("");
        setEditorDescription("");
        setEditorCode("");
    }

    // iterate through an array with information set after a response from axios
        // sort the results, latest show up first
    function renderSnippets() {

        // we do not want to change state variables so we cannot work directly with it
        // make a copy with spread operator
            // put all of the indivual items as elements in a new array
        let sortedSnippets = [...snippets];
        sortedSnippets = sortedSnippets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return sortedSnippets.map((snippet, i) => {
            return <Snippet key = {i} snippet = {snippet} />;
        });
    }

    return (
        <div className = "home">
            {!newSnippetEditorOpen && (
                <button onClick = {() => setNewSnippetEditorOpen(true)}>
                    Add a snippet
                </button>
            )}
            {newSnippetEditorOpen && (
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
            )}
            {renderSnippets()}
        </div>
    );
}

export default Home;