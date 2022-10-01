import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
