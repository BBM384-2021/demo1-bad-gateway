import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './components/common/Application';
import reportWebVitals from './reportWebVitals';
import store, {history} from "./store/config";
import {BASE} from './constants/urls';
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {BrowserRouter} from "react-router-dom";

import 'moment/locale/tr';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter basename={BASE}>
          <Application />
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
