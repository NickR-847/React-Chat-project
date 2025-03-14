import React from 'react';
import "./App.css"
import Header from './components/Header/Header';
import Auth from './components/auth/Auth';

function App() {
  return (
    <div >
      <h1>Welcome to App.jsx</h1>
      {/* Import Header */}
      <Header />
      {/* TODO: Import NavBar equivalent */}

      {/* Import Auth */}
      <Auth />
    </div>
  );
}


export default App;
