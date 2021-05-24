import axios from "axios";
import React from "react";
import Router from "./Router";
import "./style/index.scss";

axios.defaults.withCredentials = true;

// capital letter otherwise detects HTML
function App() {
    return (
        <div className = "container">
            <Router />
        </div>
    );
}

export default App;