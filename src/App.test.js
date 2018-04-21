import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Board from './game/board';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Board />, div);
});
