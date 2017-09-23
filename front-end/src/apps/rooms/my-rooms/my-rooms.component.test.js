import React from 'react';
import ReactDOM from 'react-dom';
import App from './my-rooms.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
