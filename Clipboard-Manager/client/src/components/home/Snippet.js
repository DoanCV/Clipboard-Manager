import React from "react";

// destructure object into snippet
function Snippet({snippet}) {
    return (
        <div className = "snippet">
            {snippet.title && <h2>{snippet.title}</h2>}
            {snippet.description && <p>{snippet.description}</p>}
            {snippet.code && (
                <pre>
                    <code>{snippet.code}</code>
                </pre>
            )}
        </div>
    );
};

export default Snippet;