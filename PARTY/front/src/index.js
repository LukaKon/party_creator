import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import {axiosInstance} from "./axios";
import { store } from "./redux/store";
import { App } from "./components/App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

