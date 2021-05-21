import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";

function Home() {

    // empty array otherwise defaults to undefined
    const [snippets, setSnippets] = useState([]);

    // bool to check editor state, not open by default
    const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);

    // when user edits, the existing clipboard content must be present in the editor
    const [editSnippetData, setEditSnippetData] = useState(null);

    useEffect(() => {
        getSnippets();
    }, []);

    async function getSnippets() {
        const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
        setSnippets(snippetsRes.data);
    }

    // pre-load the current version of clipboard data into the editor
    function editClipboard(snippetData) {
        setEditSnippetData(snippetData);
        setSnippetEditorOpen(true);
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
            return <Snippet key = {i} snippet = {snippet} getSnippets = {getSnippets} editClipboard = {editClipboard} />;
        });
    }

    return (
        <div className = "home">
            {!snippetEditorOpen && (
                <button onClick = {() => setSnippetEditorOpen(true)}>
                    Add a snippet
                </button>
            )}
            {snippetEditorOpen && (
                <SnippetEditor 
                    setNewSnippetEditorOpen = {setSnippetEditorOpen} 
                    getSnippets = {getSnippets}
                    editSnippetData = {editSnippetData}
                />
            )}
            {renderSnippets()}
        </div>
    );
}

export default Home;