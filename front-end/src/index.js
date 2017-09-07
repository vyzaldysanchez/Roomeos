import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {DiscoverRoomsComponent} from './apps';

loadComponent('discoverRooms', <DiscoverRoomsComponent/>);

function loadComponent(componentName, componentInstance) {
  const componentEl = document.getElementById(componentName);

  if (componentEl) {
    ReactDOM.render(componentInstance, componentEl);
  }
}