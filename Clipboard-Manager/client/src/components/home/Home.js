import Axios from "axios";
import React, { useEffect, useState } from "react";
import Snippet from "./Snippet";

function Home() {

    // empty array otherwise defaults to undefined
    const [snippets, setSnippets] = useState([]);

    useEffect(() => {
        getSnippets;
    }, []);

    async function getSnippets() {
        const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
        setSnippets(snippetsRes.data);
    }

    // iterate through an array with information set after a response from axios
    function renderSnippets() {
        return snippets.map((snippet, i) => {
            return <Snippet key = {i} snippet = {snippet} />;
        })
    }

    return <div className = "home">Home</div>
}

export default Home;