import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./redux/api.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={api}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
