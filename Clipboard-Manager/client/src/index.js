import React from "react";
import ReactDOM from "react-dom";

// React uses jsx

function clock() {
  const e1 = (
  <div>
    <h1>Clock</h1>
    <p>It is {new Date().toLocaleTimeString()}</p>
    <input />
  </div>
  );
  ReactDOM.render(e1, document.getElementById("root"));
}

setInterval(clock, 1000);

function message(){
  return <h1>Chata</h1>;
}

ReactDOM.render(message, document.getElementById("root"));