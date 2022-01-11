//if its one of, make it a module
//if you need more than one, its a factory constuctor

(function () {


    window.onload = event => {
        const startBt = document.querySelector('.submitBt');
        
        startBt.addEventListener('click', event => {

            console.log(document.getElementById('p1-name').value);
            let p1Name = document.getElementById('p1-name').value;
            let p2Name = document.getElementById('p2-name').value;

            if (p1Name === '') {
                p1Name = 'Player 1';
            }
            if (p2Name === ''){
                p2Name = 'Player 2';
            }


            document.querySelector('.page1').style.display = 'none';
            document.querySelector('.page2').style.display = 'block';

            displayController.initGame(p1Name, p2Name);

        })
    }

    //need to remake this the board. Page needs to have the board rendered from this
    const gameObject = (() => {
        const gameBoard = ['', '', '', '', '', '', '', '', '']

        const render = () => {
            const board = document.querySelector('.grid-container');
            for (i = 0; i < 9; i++) {
                let tile = document.createElement('button');
                tile.innerText = gameBoard[i];
                tile.dataset.position = i;

                if (gameBoard[i] !== '') {
                    tile.dataset.filled = true;
                }
                else tile.dataset.filled = false;


                tile.className = 'boardTile';
                if (i === 0 || i === 6 || i === 3) {
                    tile.classList.add('right');
                }
                else if (i === 2 || i === 5 || i === 8) {
                    tile.classList.add('left');
                }
                if (i === 3 || i === 4 || i === 5) {
                    tile.classList.add('up', 'down');
                }
                board.appendChild(tile);
            }
        }

        const reset = () => {
            const board = document.querySelector('.grid-container');
            board.replaceChildren();
            render();
        }

        //send the e.target element ?
        const adjustTile = (tile) => {
            tile.classList.add = 'filled'
        }

        const getBoard = () => gameBoard;
        const restartGame = () => {
            for (i = 0; i < gameBoard.length; i++) {
                gameBoard[i] = '';
            }
            const board = document.querySelector('.grid-container');
            board.replaceChildren();
        }
        const setBoard = (index, marker) => {
            gameBoard[index] = marker;
            console.log(gameBoard);
            reset();
        }

        const winCheck = (currPlayer) => {
            const marker = currPlayer.getSymbol();
            //checks all rows for a win
            if ((gameBoard[0] === marker && gameBoard[1] === marker && gameBoard[2] === marker) || (gameBoard[3] === marker && gameBoard[4] === marker && gameBoard[5] === marker) || (gameBoard[6] === marker && gameBoard[7] === marker && gameBoard[8] === marker)) {
                console.log(`${currPlayer.getName()} is the winner with a straight row!`);
                return 'true';
            }
            //checks all columns for a win
            else if ((gameBoard[0] === marker && gameBoard[3] === marker && gameBoard[6] === marker) || (gameBoard[1] === marker && gameBoard[4] === marker && gameBoard[7] === marker) || (gameBoard[2] === marker && gameBoard[5] === marker && gameBoard[8] === marker)) {
                console.log(`${currPlayer.getName()} is the winner with a straight column!`);
                return 'true'
            }
            //checks diagonals for a win
            else if ((gameBoard[0] === marker && gameBoard[4] === marker && gameBoard[8] === marker) || (gameBoard[2] === marker && gameBoard[4] === marker && gameBoard[6] === marker)) {
                console.log(`${currPlayer.getName()} is the winner with a diagonal!`);
                return 'true';
            }
            else return 'false';
        }
        return { render, setBoard, reset, restartGame, getBoard, winCheck }
    })();

    /* game logic/steps?
        track which turn it is 
        on click, add player's marker into the gameboard
        re render the board to show the changes
        increment turn, 
            if a player as done 3 or more turns, check if a win has happened
            if so, declare winner
        check if turn is 9. If turn is 9 and no win has happened, delcare tie    
        switch current player
        repeat
            */




    //self explainatory, factory for player objects. should contain turns taken?, winner status, symbol
    const Player = (name, marker) => {
        let userName = name;
        let turnsTaken = 0;
        let currTurn = false;
        let winner = false;
        let symbol = marker


        const getSymbol = () => symbol;
        const getTurn = () => turnsTaken;

        const incrementTurn = () => {
            turnsTaken++;
        }

        const resetTurnsTaken = () => {
            turnsTaken = 0;
        }
        const getCurr = () => currTurn;
        const setCurr = () => {
            currTurn = !currTurn;
        }

        const setWinner = () => winner = true;
        const getStatus = () => winner;

        const getName = () => userName;
        const setName = (name) => {
            userName = name;
        }


        return { getSymbol, getTurn, incrementTurn, setWinner, getStatus, getCurr, setCurr, getName, resetTurnsTaken, setName };
    };

    //redo this as the game controller
    const displayController = (() => {
        //what does this object need to control?
        //pointers to the game board
        //players
        const resetBt = document.querySelector('.reset')
        const board = document.querySelector('.grid-container');
        const turnindicator = document.querySelector('.turn-indicator');
        let currPlayer;
        const player1 = Player('p1', 'x');
        const player2 = Player('p2', 'o');
        let check = 'false';
        let winner;
        player1.setCurr();
        currPlayer = player1;



        const reset = () => {
            currPlayer;
            check = 'false';
            winner = false;

            player1.resetTurnsTaken();
            player2.resetTurnsTaken();

            if (player1.getCurr() === true) {
                //do nothing if player1 is already true;
            }
            else {
                player1.setCurr(); //change false to true for next game
            }
            currPlayer = player1;
            if (player2.getCurr() === true) {
                player2.setCurr(); //reverse player 2 to be second
            }
            gameObject.restartGame();
            initGame(player1.getName(), player2.getName());
            console.log('reset worked?');
        }

        const initGame = (p1Name,p2Name) => {
            gameObject.render();
            player1.setName(p1Name);
            player2.setName(p2Name);
            turnindicator.innerText = `${currPlayer.getName()}'s turn`
            console.log(currPlayer.getName());
            board.addEventListener('click', playRound);
            resetBt.addEventListener('click', reset)
        }



        const playRound = (event) => {
            
            console.log(currPlayer.getName());
            if (event.target.className.includes('boardTile') && event.target.dataset.filled !== 'true') {
                gameObject.setBoard(event.target.dataset.position, currPlayer.getSymbol());
                console.log(`Turn before update ${currPlayer.getTurn()}`)
                currPlayer.incrementTurn();


                if (currPlayer.getTurn() >= 3) {
                    check = gameObject.winCheck(currPlayer);

                }
                if (player1.getTurn() === 5 && player2.getTurn() === 4 && check !== 'true') {
                    //declare tie
                    check = 'tie';
                    console.log('tie has occured');
                    turnindicator.innerText = `Tie!`
                    return;
                }

                if (check === 'true') {
                    board.removeEventListener('click', playRound);
                    console.log('win has occured')
                    winner = currPlayer.getName();
                    turnindicator.innerText = `${winner} has won the game!`
                    return;
                }
                if (currPlayer === player1) {
                    currPlayer = changeTurn(player2);
                }
                else currPlayer = changeTurn(player1);

            }
        }

        const changeTurn = (nextPlayer) => {
            currPlayer.setCurr();
            currPlayer = nextPlayer;
            currPlayer.setCurr();
            turnindicator.innerText = `${currPlayer.getName()}'s turn`
            return currPlayer;
        }

        return { initGame, reset }
    })();



})();


/* const Player = (name, level) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName  = () => name;
  const die = () => {
    // uh oh
  };
  const damage = x => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };
  const attack = enemy => {
    if (level < enemy.getLevel()) {
      damage(1);
      console.log(`${enemy.getName()} has damaged ${name}`);
    }
    if (level >= enemy.getLevel()) {
      enemy.damage(1);
      console.log(`${name} has damaged ${enemy.getName()}`);
    }
  };
  return {attack, damage, getLevel, getName}
}; */