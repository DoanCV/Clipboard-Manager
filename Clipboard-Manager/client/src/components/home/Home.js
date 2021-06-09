import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";

function Home() {

    // empty array otherwise defaults to undefined
    const [snippets, setSnippets] = useState([]);

    // bool to check editor state, not open by default
    const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);

    // when user edits, the existing clipboard content must be present in the editor
    const [editSnippetData, setEditSnippetData] = useState(null);

    // when user is logged in
        // destructure from object whihc has two components
    const { user } = useContext(UserContext);

    // callback will not complete when we do not have a valid user, clear home page of snippets
    useEffect(() => {

        if (!user) {
            setSnippets([]);          
        }
        else {
            getSnippets();
        }

    }, [user]);

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
            {!snippetEditorOpen && user && (
                <button className = "button-editor-toggle" onClick = {() => setSnippetEditorOpen(true)}>
                    Add a new clipboard
                </button>
            )}
            {snippetEditorOpen && (
                <SnippetEditor 
                    setSnippetEditorOpen = {setSnippetEditorOpen} 
                    getSnippets = {getSnippets}
                    editSnippetData = {editSnippetData}
                />
            )}
            {
                snippets.length > 0 ? renderSnippets() : user && ( 
                        <p className = "no-clipboards-message">You have no clipboards</p> 
                    )
            }
            {
                user === null && (
                    <div className = "null-user-message">
                        <h2>Welcome to Clipboard Manager</h2>
                        <Link to = "/register">Register here</Link>
                    </div>
                    )
            }
        </div>
    );
}

export default Home;