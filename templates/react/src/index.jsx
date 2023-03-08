import React from "react";
import { createRoot } from "react-dom/client";

function Main() {
  return <h1>Hello from Ampt!</h1>;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
