import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./states/store";
import Router from "./routes";
import "./assets/main.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </StrictMode>,
);
