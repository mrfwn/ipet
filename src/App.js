import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
}

export default App;
