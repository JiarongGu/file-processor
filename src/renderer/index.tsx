import 'reflect-metadata';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { SinkFactory } from 'react-redux-sink';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { App, sinkRoute, sourceRoute } from '@containers';
import { WindowSink, NavigationSink } from '@sinks';

import 'antd/dist/antd.css';
import '@styles/global.scss';

const store = SinkFactory.createStore({
  useTrigger: true,
  devToolOptions: { devToolCompose: composeWithDevTools },
});

// initialize sinks
WindowSink.load(window);

const routes = [sinkRoute, sourceRoute];

const history = NavigationSink.createHistory(routes);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
