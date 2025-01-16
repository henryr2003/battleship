class Ship {
    constructor(x1, y1, x2, y2, size) {
        this.hitCounter = 0;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.size = Math.max(y2 - y1, x2 - x1) + 1;
    }
    getSize() {
        return this.size;
    }
    getHitCounter(){
        return this.hitCounter;
    }
    hit() {
        this.hitCounter += 1;
    }

    isSunk() {
        return this.hitCounter === this.size;
    }

    coordinateArray() {
        let arr = [];
        for (let i = 0; i < this.size; i++) {
            if (this.y2 - this.y1 > this.x2 - this.x1) {
                arr.push([this.x2, this.y1 + i]);
            } else {
                arr.push([this.x1 + i, this.y2]);
            }
        }
        return arr;
    }
}

class Gameboard {
    constructor() {
        this.attackList = [];
        this.shipList = [];
        
        let carrier = new Ship(1, 1, 5, 1);
        let battleship = new Ship(1, 2, 1, 5);
        let cruiser = new Ship(6, 5, 8, 5);
        let submarine = new Ship(7, 8, 7, 10);
        let patrol = new Ship(1, 9, 1, 10);

        this.shipList.push(carrier);
        this.shipList.push(battleship);
        this.shipList.push(cruiser);
        this.shipList.push(submarine);
        this.shipList.push(patrol);


    }


    recieveAttack(x, y){
        this.attackList.push([x,y]);
        for(const ship of this.shipList) {
            let coordinates = ship.coordinateArray();
            // console.log(coordinates);
            // console.log(`hitCounter: ${ship.getHitCounter()}`)
            if(coordinates.some(pair => pair[0] == x && pair[1] == y)){
                ship.hit();
                return true
            }
            
        }

            return false
    }

    allSink(){
        let counter = 0;
        for(const ship of this.shipList){
            console.log(`counter: ${counter} `);
            console.log(`hitCounter: ${ship.getHitCounter()}`)
            if(ship.isSunk()){
                counter += 1;
                console.log(`Ship: ${ship}`);
            }
        }

        if(counter == 5){
            return true;
        }
        else{
            return false;
        }


    }

    getCoordinateList(){
        let coordinateList = []
        for(const ship of this.shipList){
            // console.log(`ship.coordinateArray: ${ship.coordinateArray()}`);
            coordinateList = [...coordinateList, ...ship.coordinateArray()]
        }
        return coordinateList;
    }

    getAttackList(){
        return this.attackList;
    }


}

class Player{
    constructor(){
        let gameboard = new Gameboard();
        this.gameboard = gameboard;
    }
}

// module.exports = {
//     Ship,
//     Gameboard,
//     Player,
// };


export {Player,};