import { useState } from 'react'
import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { turns, winningCombinations } from './scripts/constants.js'
import { saveGameToLocalStorage, resetGameToLocalStorage } from './scripts/storage.js'
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.x
  })

  const [winner, setWinner] = useState(null)

  // Check if there is a winner
  const checkWinner = (board) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    // No winner
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)

    // Remove game from local storage
    resetGameToLocalStorage()
  }

  const updateBoard = (index) => {
    // Check if square is already filled
    if (board[index] || winner) return

    // Update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Change turn
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)

    // Save game
    saveGameToLocalStorage({
      board: newBoard,
      turn: newTurn
    })

    // Check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === turns.x}>
          {turns.x}
        </Square>
        <Square isSelected={turn === turns.o}>
          {turns.o}
        </Square>
      </section>
      <button className='btn' onClick={resetGame}>Reiniciar juego</button>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
