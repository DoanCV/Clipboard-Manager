import React from "react";
import ReactDOM from "react-dom";

// React uses jsx

const name = "Jon";

const e1 = (
  <div className = "green">
    <h1
      style = {{
        background = "orange"
      }}
    >
      Hi {name}
    </h1>

  </div>

);


ReactDOM.render(e1, document.getElementById("root"));