export const saveGameToLocalStorage = ({ board, turn }) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameToLocalStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}