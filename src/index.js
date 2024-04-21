/* Importing Hooks, method, function etc. */
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

/* Creating Virtual DOM */
const container = document.getElementById("root");
const root = createRoot(container);

/* Rendering the JSX */
root.render(
  <React.StrictMode>
    {/* Proving Redux Store access to whole component */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
