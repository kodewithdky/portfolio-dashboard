import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
