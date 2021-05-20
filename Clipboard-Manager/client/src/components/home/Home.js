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

    // iterate through an array with information set after a response from axios
    function renderSnippets() {
        return snippets.map((snippet, i) => {
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
                    <form>
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
                    </form>
                </div>
            )}
            {renderSnippets()}
        </div>
    );
}

export default Home;