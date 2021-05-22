import React from "react";
import Router from "./Router";
import "./style/index.scss";

// capital letter otherwise detects HTML
function App() {
    return (
        <div className = "container">
            <Router/>
        </div>
    );
}

export default App;