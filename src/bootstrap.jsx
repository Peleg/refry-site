import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage';
import { Router, browserHistory, Route } from 'react-router';

const tree = (
  <Router history={ browserHistory }>
     <Route name="index" path="*" component={ MainPage }/>
  </Router>
);

window.onload = () => {
  ReactDOM.render(tree, document.getElementById('mount'));
};
