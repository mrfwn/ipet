import React from 'react';
import Routes from './routes/index';
import GlobalStyle from './styles/global';
import { AuthProvider } from './hooks/auth';

function App() {
  return (
    <AuthProvider>
      <Routes />
      <GlobalStyle />
    </AuthProvider>
  );
}

export default App;
