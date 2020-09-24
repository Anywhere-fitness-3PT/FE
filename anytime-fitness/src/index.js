import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Redux Store
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// Middleware and root reducer from store
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
// React Router
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Router consumer variable
const AppWithRouter = withRouter(App);
// Store Variable with middleware
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppWithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
