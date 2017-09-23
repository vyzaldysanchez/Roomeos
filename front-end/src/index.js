import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import MyRooms from "./apps/rooms/my-rooms/my-rooms.component";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as reducers from "./redux";
import AppContainer from "./apps/app-container.component";

const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhanced(applyMiddleware(thunk)));

loadComponent("discoverRooms", <MyRooms/>, store);

function loadComponent(componentName, componentInstance, store) {
  const componentEl = document.getElementById(componentName);

  if (componentEl) {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          {componentInstance}
        </AppContainer>
      </Provider>,
      componentEl);
  }
}