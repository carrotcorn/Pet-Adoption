import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

const App = () => {
  return(
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Ash" animal="Dog" breed="Australian Sheppard"/>
    <Pet name="Tom" animal="Cat" breed="American Short-Hair"/>
    <Pet name="SxreeDumps" animal="Cat" breed="Calico"/>
  </div>)
};

ReactDOM.render(<App />, document.getElementById("root"));
