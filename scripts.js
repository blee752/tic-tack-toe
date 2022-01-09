//if its one of, make it a module
//if you need more than one, its a factory constuctor

(function () {

    //need to remake this the board. Page needs to have the board rendered from this
    const gameObject = (() => {
        const gameBoard = ['', '', '', '', '', '', '', '', '']

        const render = () => {
            const board = document.querySelector('.grid-container');
            for (i = 0; i < 9; i++) {
                let tile = document.createElement('button');
                tile.innerText = gameBoard[i];
                tile.dataset.position = i;

                if(gameBoard[i] !== ''){
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
            render();
        }
        const setBoard = (index, marker) => {
            gameBoard[index] = marker;
            console.log(gameBoard);
            reset();
        }
        return { render, setBoard, reset, restartGame, getBoard }
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


        const getCurr = () => currTurn;
        const setCurr = () => {
            currTurn = !currTurn;
        }

        const setWinner = () => winner = true;
        const getStatus = () => winner;

        const getName = () => userName;


        return { getSymbol, getTurn, incrementTurn, setWinner, getStatus, getCurr, setCurr, getName};
    };

    //redo this as the game controller
    const displayController = (() => {
        //what does this object need to control?
        //pointers to the game board
        //players

        const winCheck = (currPlayer) => {
            const marker = currPlayer.getSymbol();
            const gameBoard = gameObject.getBoard();
            if((gameBoard[0]=== marker && gameBoard[1]===marker && gameBoard[2]===marker) || (gameBoard[3]=== marker && gameBoard[4]===marker && gameBoard[5]===marker) || (gameBoard[6]=== marker && gameBoard[7]===marker && gameBoard[8]===marker)){
                console.log(`${currPlayer.getName()} is the winner!`);
            }
        }

        /* what needs to be there for the game to work?
                listen for button on click to set player marker
                know which player's turn it is currently
                check for win or tie */
        const initGame = () => {
            gameObject.render();
            const board = document.querySelector('.grid-container');
            let currPlayer;
            const player1 = Player('p1', 'x');
            const player2 = Player('p2', 'o');

            player1.setCurr();
            currPlayer = player1;
            board.addEventListener('click', event => {
                if (event.target.className.includes('boardTile') && event.target.dataset.filled !== 'true') {
                    gameObject.setBoard(event.target.dataset.position, currPlayer.getSymbol());
                    console.log(`Turn before update ${currPlayer.getTurn()}`)
                    currPlayer.incrementTurn();


                    if(currPlayer.getTurn() >= 3){
                        winCheck(currPlayer);
                    }

                    if (currPlayer === player1) {
                        currPlayer = changeTurn(currPlayer, player2);
                    }
                    else currPlayer = changeTurn(currPlayer, player1);

                }

            })

        }

        const changeTurn = (currPlayer, nextPlayer) => {
            currPlayer.setCurr();
            currPlayer = nextPlayer;
            currPlayer.setCurr();
            return currPlayer;
        }



        return { initGame }
    })();

    displayController.initGame();

    console.log('this is invoked on start');
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