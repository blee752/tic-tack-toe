//if its one of, make it a module
//if you need more than one, its a factory constuctor

(function () {


    //i think this object should have the logic to check winner, reset, add the event listeners etc
    const gameObject = (() => {
        const gameBoard = [[1,2,3],[4,5,6],[7,8,9]];
        /* gameboard: 
            1   2   3
            4   5   6
            7   8   9 */
            //?
    })();

    //this object should control what the players see, ie adjust symbol on board tile
    const displayController = (() => {
        function reset() {
            //reset apperance
        }
    })();

    //self explainatory, factory for player objects. should contain turns taken?, winner status, symbol
    const Player = () => {

    };

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