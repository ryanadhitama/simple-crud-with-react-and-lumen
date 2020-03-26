import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppHook from "./AppHook";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <AppHook />
  </React.StrictMode>,
  rootElement
);
