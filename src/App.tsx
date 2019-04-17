import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MainLayout } from './meta-pages/MainLayout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
  }
}

export default App;
