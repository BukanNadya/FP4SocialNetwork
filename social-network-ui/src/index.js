import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import  rootReducer  from "./store/rootReduser";
import { createStore, applyMiddleware, compose } from "redux";
import { ModalContext, ModalProvider } from "./context/ModalContext";
// import 'normalize.css';

import { App } from "./App";
import { Provider } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ModalProvider>
                <App/>
            </ModalProvider>
        </PersistGate>
    </Provider>
);