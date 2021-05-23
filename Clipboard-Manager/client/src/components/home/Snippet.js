import Axios from "axios";
import React from "react";
import "./Snippet.scss";

// destructure object into snippet
function Snippet({snippet, getSnippets, editClipboard}) {

    async function deleteClipboard() {

        await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);
        getSnippets();

    }

    return (
        <div className = "snippet">
            {snippet.title && <h2 className = "title">{snippet.title}</h2>}
            {snippet.description && <p className = "description">{snippet.description}</p>}
            {snippet.code && (
                <pre className = "code">
                    <code>{snippet.code}</code>
                </pre>
            )}

            <button className = "button-edit" onClick = {() => editClipboard(snippet)}>
                Edit Clipboad
            </button>

            <button className = "button-delete" onClick = {deleteClipboard}>
                Delete Clipboard
            </button>
        </div>
    );
}

export default Snippet;