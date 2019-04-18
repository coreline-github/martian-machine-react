import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MainLayout } from './meta-pages/MainLayout';
import { printNameOnRender } from './utils/print-name-on-render';

const App = printNameOnRender(({ message }) => {
  return (
    <BrowserRouter>
      <MainLayout message={message} />
    </BrowserRouter>
  );
}, 'App');

export default App;
