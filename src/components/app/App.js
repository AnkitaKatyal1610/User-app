import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import Users from '../users/users';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Users />
      </Provider>
    );
  }
}

export default App;
