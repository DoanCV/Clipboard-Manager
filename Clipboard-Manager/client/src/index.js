import React from "react";
import ReactDOM from "react-dom";

// React uses jsx

function clock() {
  const e1 = (
  <div>
    <h1>Clock</h1>
    <p>It is {new Date().toLocaleTimeString()}</p>
  </div>
  );
  return e1;
}



ReactDOM.render(null, document.getElementById("root"));