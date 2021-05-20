import Axios from "axios";
import React, { useEffect, useState } from "react";
import Snippet from "./Snippet";

function Home() {

    // empty array otherwise defaults to undefined
    const [snippets, setSnippets] = useState([]);

    // bool to check editor state, not open by default
    const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);

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
                        <input id = "editor-title" type = "text" />
                    </form>
                </div>
            )}
            {renderSnippets()}
        </div>
    );
}

export default Home;