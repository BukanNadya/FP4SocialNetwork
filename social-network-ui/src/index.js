import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import  rootReducer  from "./store/rootReduser";
import { createStore, applyMiddleware, compose } from "redux";
import 'normalize.css';

import { App } from "./App";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);


