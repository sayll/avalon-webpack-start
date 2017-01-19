import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/index';
import App from './containers/App';

let store = createStore(reducers);

function start() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('body')
  );
}
start();

store.subscribe(start);

