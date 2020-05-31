import { Game } from "./Game"

let game = new Game(16)

document.addEventListener('DOMContentLoaded', () => {
    const newPuzzle = document.getElementById('newPuzzle')
    const solvePuzzle = document.getElementById('solvePuzzle')
    const nextMove = document.getElementById('nextMove')

    newPuzzle.addEventListener('click', () => {
        game = new Game(16)
    })

    solvePuzzle.addEventListener('click', () => game.solvePuzzle())

    // nextMove.addEventListener('click', () => {
    //     game.change(...game.steps.splice(0, 1))
    // })
})