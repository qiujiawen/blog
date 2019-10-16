/**
 *  应用程序入口文件
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RouteIndex from './route/index';
import reducer from './redux/index';
import './public/css/index.css';

let store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {

    render(){
    return (
      <Provider store={store}>
        <div id='app'>
          <RouteIndex/>
        </div>
      </Provider>
    )
  }
};
