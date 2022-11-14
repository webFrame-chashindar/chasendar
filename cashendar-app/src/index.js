import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //css import
import "./bootstrap.min.css";
import App from "./App";

const element = document.getElementById("root");
const root = createRoot(element);
root.render(<App />);
