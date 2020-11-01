import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import GlobalStyle from './styles/global';
import { AuthProvider } from './hooks/auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </Router>
  );
}

export default App;
