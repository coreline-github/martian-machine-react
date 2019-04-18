import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MainLayout } from './meta-pages/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
