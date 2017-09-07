import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

loadComponent('discoverRooms');

function loadComponent(componentName) {
  const componentEl = document.getElementById(componentName);

  if (componentEl) {
    ReactDOM.render(<App/>, componentEl);
  }
}