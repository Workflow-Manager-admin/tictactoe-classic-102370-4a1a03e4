import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <a
              className="btn"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ paddingTop: 86, paddingBottom: 44 }}>
          <h1 className="title" style={{ textAlign: "center", marginBottom: 8, fontSize: "2.2rem" }}>
            TicTacToe Classic
          </h1>
          <div className="description" style={{ textAlign: "center", marginBottom: 40, color: "#555" }}>
            Two-player classic Tic Tac Toe. First to align three wins!
          </div>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;