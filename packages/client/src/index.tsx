
import React from "react";
import {render} from "react-dom";
import { App } from "./app";

// import { Provider } from "react-redux";
// import {store} from './redux/store'
// import { createStore } from "redux";
// import { rootReducer } from "./redux/reducers";

// import configureStore from "./redux/configure-store";

// const store = configureStore({});
// ReactDOM.render(<App />, document.getElementById('root'));

const rootElement = document.getElementById("root");
render(
  // <Provider store={store}>
    <App />,
  // </Provider>,
  rootElement
);