// Fuente: https://www.instagram.com/p/CU1bfrClcB6/

const boxes = document.querySelectorAll(".box");
const text = document.querySelector("#heading");
const strategy = document.querySelector("#strategy");
const btnRestart = document.querySelector("#restart");

const spaces = [];
const tick_O = "O";
const tick_X = "X";
let currentPlayer = tick_O;

const drawBoard = () =>{
    boxes.forEach((box, i) => {
        let styleString = "";
        
        if(i < 3){
            styleString += "border-bottom: 3px solid var(--text);";
        }
        if(i % 3 === 0){
            styleString += "border-right: 3px solid var(--text);";
        }
        if(i % 3 === 2){
            styleString += "border-left: 3px solid var(--text);";
        }
        if(i > 5){
            styleString += "border-top: 3px solid var(--text);";
        }

        box.style = styleString;
        box.addEventListener("click", boxClicked);
    });
};

const boxClicked = (e) => {
    const id = e.target.id;
    console.log(e);

    if(!spaces[id]){
        console.log(spaces[id]);
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerWon()){
            text.innerText = `${currentPlayer} has won!`;;
            restart();
            return;
        }

        if(playerDraw()){
            return;
        }

        currentPlayer = currentPlayer === tick_O ? tick_X: tick_O;
    }
};

const playerWon = () =>{
    if (spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by top line!!`;
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by left line!!`;
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by diagonal line!!`;
            return true;
        }
    }

    if (spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by right line!!`;
            return true;
        }if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by bottom line!!`;
            return true;
        }
    }

    if (spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by vertical middle line!!`;
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by horizontal middle line!!`;
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerText = `${currentPlayer} wins by diagonal line!!`;
            return true;
        }
    }
};

const playerDraw = () =>{
    let draw = 0;
    spaces.forEach((space, i) => {
        if(spaces[i] !== null) draw++;
    });

    if(draw === 9){
        text.innerText = 'Draw';
        restart();
    }
};

const restart = () => {
    setTimeout(() => {
        spaces.forEach((space, i) => {
            spaces[i] = null;
        });

        boxes.forEach((box) => {
            box.innerText = "";
        });

        text.innerText = 'Play';
        strategy.innerText = '';
    }, 1000);
};

btnRestart.addEventListener("click", restart);
restart();
drawBoard();