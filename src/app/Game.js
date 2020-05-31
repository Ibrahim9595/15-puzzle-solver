import { isEven, solve } from './solver';

export class Game {
    constructor(size = 16) {
        let p = new Array(size - 1).fill(0)
            .map((_, i) => i + 1)

        do {
            p = this.shuffle(p)
        } while (!isEven(p));

        this.board = [...p, 0];

        this.hole = size - 1;

        this.initUI();
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    initUI() {
        const rowSize = Math.sqrt(this.board.length);
        let div = document.getElementById("wrapper");
        let v = "";
        for (let i = 0; i < this.board.length; i++) {
            const [col, row] = [parseInt(i / rowSize, 10), i % rowSize];
            v += `<div id='${i}' style="transform: translate(${row * 80}px,${col * 80}px)" class='tile ${!this.board[i] ? "empty" : ""}'>${
                this.board[i] || ''
                }</div>`;
        }
        div.innerHTML = v;
    }

    updateUI(ind) {

        const hole = document.getElementById(this.hole);
        const replace = document.getElementById(ind);

        [hole.id, replace.id] = [replace.id, hole.id];
        [hole.style.transform, replace.style.transform] = [replace.style.transform, hole.style.transform];

        [this.board[ind], this.board[this.hole]] = [this.board[this.hole], this.board[ind]];

        this.hole = ind;

    }

    solvePuzzle() {
        this.steps = solve(this.board);

        let interval = setInterval((() => {
            document.getElementById("result").innerHTML =
                "Steps to solve the puzzle " + this.steps.length + " steps";
            if (this.steps.length) {
                this.updateUI(...this.steps.splice(0, 1));
            } else {
                clearInterval(interval);
            }
        }).bind(this), 610);
    }
}
