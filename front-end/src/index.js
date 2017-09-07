import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {DiscoverRooms} from './apps';

loadComponent('discoverRooms', <DiscoverRooms/>);

function loadComponent(componentName, componentInstance) {
  const componentEl = document.getElementById(componentName);

  if (componentEl) {
    ReactDOM.render(componentInstance, componentEl);
  }
}