import PriorityQueue from 'tinyqueue'

const getKey = p => p.join("")

const getGoal = p => getKey(
    new Array(p.length).fill(0)
        .map((_, i) => (i < p.length - 1) ? i + 1 : 0)
)

export const isEven = p => {
    let inversions = 0

    for (let i = 0; i < p.length - 1; i++) {
        for (let j = i; j < p.length; j++) {
            if (p[i] > p[j] && p[j] !== 0) inversions += 1
        }
    }

    return inversions % 2 === 0
}

const manhatenDist = p => {
    const SIZE = parseInt(Math.sqrt(p.length), 10)

    return p
        .reduce(
            (dist, el, i) =>
                el !== 0 ?
                    // Accumulator Distance
                    dist +
                    // Col-Difference
                    Math.abs(((el - 1) % SIZE) - (i % SIZE)) +
                    // Row-Difference
                    Math.abs(parseInt((el - 1) / SIZE, 10) - parseInt(i / SIZE, 10))
                    :
                    dist, 0
        )
}

const applyMoves = (p, path, blank) => {
    const l = parseInt(Math.sqrt(p.length), 10)
    const MOVES =
        blank % l === 0 ? [1, l, -l] :
            (blank + 1) % l === 0 ?
                [-1, l, -l] : [1, -1, l, -l]

    return (
        MOVES
            // Remove illegal options diriction = 0 || diriction out of the board
            .filter(
                move => (move + blank < p.length && move + blank >= 0)
            )
            // Map to the new states
            .map(move => {
                const newBoard = p.slice(0)
                if (newBoard) [newBoard[move + blank], newBoard[blank]] = [newBoard[blank], newBoard[move + blank]]

                return [
                    // manhaten distance to detirmine the priority
                    manhatenDist(newBoard),
                    // The path of the blank so far
                    [...path, move + blank],
                    // new board
                    newBoard
                ]
            })
    )
}

export const solve = p => {
    if (isEven(p)) {
        const visited = {}
        const q = new PriorityQueue([[0, [p.indexOf(0)], p]], (a, b) => a[0] - b[0])
        const goal = getGoal(p)

        while (q.length) {
            const [, path, curr] = q.pop()

            if (getKey(curr) === goal) return path

            if (!visited[getKey(curr)]) {
                visited[getKey(curr)] = true
                applyMoves(curr, path, path[path.length - 1]).forEach(nextState =>
                    q.push(nextState)
                )
            }
        }
    }
}
