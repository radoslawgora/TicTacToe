window.onload = function(){
    app.init();
}

class App {
    winningVariants = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    currentPlayer = "X";

    init() {
        document.querySelectorAll(".cell").forEach(
            cell => cell.addEventListener("click", this.cellClick)
        );

        document.getElementById("restart_game_button").addEventListener("click", () =>
            this.restartGame() );
    }

    cellClick = (e) => {
        this.playerTurn(e.target);
    }

    initGame() {
        this.currentPlayer = "X";

        document.querySelectorAll(".cell").forEach(
            el => {el.innerHTML = "";}
        )
    }

    playerTurn(el) {
        if(el.innerHTML == "X" || el.innerHTML == "O") return;
        el.innerHTML = this.currentPlayer;

        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";

        this.checkWinner();
    }

    checkWinner() {
        for(let i = 0; i < this.winningVariants.length; i++){
            const variant = this.winningVariants[i];
            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if(a == "" || b == "" || c == "") continue;

            if(a == b && b == c) {
                console.log("Zwycięsca: " + a);
                this.setWinner("Poprzedni zwycięsca: " + a);
                alert("Koniec gry! Zwycięsca: " + a);
                this.restartGame();
            }
        }
    }

    setWinner(str) {
        document.getElementById("winner").innerHTML = str;
    }

    getCellValue(index) {
        return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
    }

    restartGame() {
        this.initGame();
    }
}

const app = new App();