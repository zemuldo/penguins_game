import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Board from './game/board';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './store/reducers'


const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>, div);
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Board />
    </BrowserRouter>
</Provider>, div);
});
