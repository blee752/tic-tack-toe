//if its one of, make it a module
//if you need more than one, its a factory constuctor

(function () {

    //this object should control what the players see, ie adjust symbol on board tile
    const displayController = (() => {
        //what does this object need to control?
        //pointers to the game board
        //players
        const boardTiles = document.querySelectorAll('.boardTile');
        console.log(boardTiles);
        const reset = () => {
            //reset apperance
            boardTiles.forEach(tile => {
                console.log(tile.lastElementChild.innerText);
                tile.lastElementChild.innerText = '';
                if(tile.className.includes('filled')){
                    tile.classList.remove('filled');
                }
            })
        }

        const setSymbol = (player, event) => {
            event.target.lastElementChild.innerText = player.getSymbol();
        }
        return {
            reset, setSymbol
        };
    })();

    //self explainatory, factory for player objects. should contain turns taken?, winner status, symbol
    const Player = (playernum) => {
        let turnsTaken = 0;
        let currTurn;
        let winner = false;
        let symbol;
        if (playernum === 1) {
            symbol = 'x';
            currTurn = true;
        }
        else {
            symbol = 'o';
            currTurn = false;
        }

        const getSymbol = () => symbol;
        const getTurn = () => turnsTaken;

        const incrementTurn = () => {
            turnsTaken++;
        }


        const getCurr = () => currTurn;
        const setCurr = () => {
            console.log('before:' +currTurn);
            currTurn = !currTurn;
            console.log('after:' +currTurn);

        }

        const setWinner = () => winner = true;
        const getStatus = () => winner;

        

        return { getSymbol, getTurn, incrementTurn, setWinner, getStatus, getCurr, setCurr };
    };

    //i think this object should have the logic to check winner, reset, add the event listeners etc
    const gameObject = (() => {
        const gameBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        /* gameboard: 
            1   2   3
            4   5   6
            7   8   9 */
        //?

        //dom pointers
        const board = document.querySelector('.grid-container');


        const winCheck = (player) => {
            //do something to check if someone won
            player.setWinner();

        }



        /* Whats needed for this game?
                1. Players to be setup
                2. event listeners for on click 
                3. function checking for winners
                    3a. if won, disable event listeners and pop up modal
                4. event listeners for reset*/
        const initGame = () => {
            const player1 = Player(1);
            const player2 = Player(2);
            let currPlayer;


            board.addEventListener('click', (event) => {
                if(event.target.className.includes('boardTile') && (!event.target.className.includes('filled'))){
                    if(player1.getCurr() === true){
                        currPlayer = player1;
                    }
                    else currPlayer = player2;
                    displayController.setSymbol(currPlayer, event);
                    event.target.classList.add('filled')
                    if(currPlayer === player1){
                        currPlayer.setCurr();
                        currPlayer = player2;
                        currPlayer.setCurr();
                    }
                    else {
                        currPlayer.setCurr();
                        currPlayer = player1;
                        currPlayer.setCurr();
                    }
                }
            })

        }
        return {initGame}
    })();

gameObject.initGame();


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