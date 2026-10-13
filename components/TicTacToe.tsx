"use client";

import { useState } from "react";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(b: Cell[]): Cell {
  for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return null;
}

// Simple AI: win, block, take centre, else first free cell.
function aiMove(b: Cell[]): number {
  const free = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  for (const mark of ["O", "X"] as const) {
    for (const i of free) {
      const next = [...b];
      next[i] = mark;
      if (winner(next) === mark) return i;
    }
  }
  if (!b[4]) return 4;
  return free[Math.floor(Math.random() * free.length)];
}

export default function TicTacToe({ onClose }: { onClose: () => void }) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const win = winner(board);
  const full = board.every(Boolean);

  const play = (i: number) => {
    if (board[i] || win) return;
    const next = [...board];
    next[i] = "X";
    if (!winner(next) && next.some((c) => !c)) next[aiMove(next)] = "O";
    setBoard(next);
  };

  const status = win === "X" ? "You win! 🎉" : win === "O" ? "I win this time 😉" : full ? "It's a draw" : "Your move (X)";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Tic Tac Toe">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h3>Tic Tac Toe</h3>
        <p className="ttt-status">{status}</p>
        <div className="ttt-grid">
          {board.map((c, i) => (
            <button key={i} className="ttt-cell" onClick={() => play(i)} disabled={!!c || !!win}>
              {c}
            </button>
          ))}
        </div>
        <button className="ds-btn ds-btn--navy" onClick={() => setBoard(Array(9).fill(null))}>
          Play again
        </button>
      </div>
    </div>
  );
}
