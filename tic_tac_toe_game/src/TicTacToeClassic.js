import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Main container for the classic TicTacToe game.
 * Features:
 * - Two player mode (X and O turn-based)
 * - Win/draw detection
 * - Game reset
 * - Status and turn display
 * - 3x3 centered clickable grid UI
 * - Uses #222222 (primary), #ffffff (secondary), #4caf50 (accent)
 * - Light theme adaptation via inline style
 */
function TicTacToeClassic() {
  // 3x3 grid initial state
  const emptyBoard = Array(9).fill(null);

  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [winner, setWinner] = useState(null);

  /**
   * Determines if there is a winner or draw in the current board state.
   * @param {Array<string|null>} squares 
   * @returns {'X'|'O'|null}
   */
  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    // Winning line indices for 3x3 grid.
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  /**
   * Handles click on a cell.
   * @param {number} idx 
   */
  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || gameStatus !== "ongoing") return; // Ignore if clicked cell is not empty or game is over
    const updatedBoard = board.slice();
    updatedBoard[idx] = xIsNext ? "X" : "O";
    const win = calculateWinner(updatedBoard);
    const isDraw = !win && updatedBoard.every(cell => cell);

    setBoard(updatedBoard);
    setWinner(win);
    
    if (win) {
      setGameStatus("win");
    } else if (isDraw) {
      setGameStatus("draw");
    } else {
      setXIsNext(!xIsNext);
    }
  }

  /**
   * Resets game state.
   */
  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setGameStatus("ongoing");
    setWinner(null);
  }

  // Status & display messages
  let statusMessage = "";
  if (gameStatus === "win") {
    statusMessage = `Player ${winner} wins!`;
  } else if (gameStatus === "draw") {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = `Player ${xIsNext ? "X" : "O"}'s turn`;
  }

  // COLORS: primary: #222222, secondary: #ffffff, accent: #4caf50
  const colorVars = {
    "--t3t-primary": "#222222",
    "--t3t-secondary": "#ffffff",
    "--t3t-accent": "#4caf50",
  };

  // Styling for parts: outer container, board/grid, cells, status, button
  return (
    <div
      className="t3t-container"
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--t3t-secondary)",
        ...colorVars,
      }}
    >
      {/* Current turn */}
      <div
        className="t3t-turn"
        style={{
          color: "var(--t3t-primary)",
          fontSize: "1.5rem",
          fontWeight: 500,
          marginBottom: 16,
        }}
      >
        {gameStatus === "ongoing" && (
          <>Turn: <span style={{ color: "var(--t3t-accent)" }}>{xIsNext ? "X" : "O"}</span></>
        )}
        {(gameStatus === "win" || gameStatus === "draw") && "Game Over"}
      </div>

      {/* 3x3 grid */}
      <div
        className="t3t-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 64px)",
          gridTemplateRows: "repeat(3, 64px)",
          gap: 8,
          background: "var(--t3t-primary)",
          padding: 12,
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(34,34,34,0.10)",
          marginBottom: 24,
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="t3t-cell"
            style={{
              width: 64,
              height: 64,
              background: "var(--t3t-secondary)",
              color: cell === "X" ? "var(--t3t-primary)" : "var(--t3t-accent)",
              border: "2px solid var(--t3t-primary)",
              borderRadius: 8,
              fontSize: "2rem",
              fontWeight: "bold",
              cursor: cell || gameStatus !== "ongoing" ? "not-allowed" : "pointer",
              outline: "none",
              transition: "background 0.2s",
            }}
            aria-label={`cell ${idx % 3 + 1},${Math.floor(idx / 3) + 1}`}
            onClick={() => handleCellClick(idx)}
            disabled={!!cell || gameStatus !== "ongoing"}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Status message & reset */}
      <div
        className="t3t-status-bar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          className="t3t-status-message"
          style={{
            minHeight: 28,
            color:
              gameStatus === "win"
                ? "var(--t3t-accent)"
                : gameStatus === "draw"
                ? "#aaa"
                : "var(--t3t-primary)",
            fontSize: "1.2rem",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {statusMessage}
        </div>
        <button
          className="t3t-reset-btn"
          aria-label="Reset Game"
          onClick={handleReset}
          style={{
            background: "var(--t3t-accent)",
            color: "var(--t3t-secondary)",
            border: "none",
            borderRadius: 6,
            padding: "10px 28px",
            fontSize: "1.08rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(34,34,34,0.07)",
            letterSpacing: "1px",
            marginTop: 0,
            transition: "background 0.15s"
          }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
