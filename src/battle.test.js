const {
    Ship,
    Gameboard
} = require("./battle.js");


describe("ship functionality", () => {

    test("ship size", () => {
        let newShip = new Ship(1,1,2,1);
        expect(newShip.getSize()).toBe(2);
    })
    test("hitting ship", () => {
        let newShip = new Ship(1,1,2,1);
        newShip.hit();
        expect(newShip.isSunk()).toBe(false);
        
    })

    test("giving coordinates", () => {
        let newShip = new Ship(1, 1, 5, 1);
        
        expect(newShip.coordinateArray()).toEqual([[1,1], [2,1], [3,1], [4,1], [5,1]]);
    })

    test("giving coordinates", () => {
        let newShip = new Ship(4, 4, 4, 8);
        
        expect(newShip.coordinateArray()).toEqual([[4,4], [4,5], [4,6], [4,7], [4,8] ]);
    })

    test("fully sinking ship", () => {
        let gameboard = new Gameboard();
        
        gameboard.recieveAttack(1,9);
        gameboard.recieveAttack(1,10);


        
    })

    // test("includes", () => {
    //     let newShip = new Ship(1, 1, 5, 1);
        
    //     let coordinates = newShip.coordinateArray();
    //     expect(coordinates.includes([1,1])).toBe(true);
             
    // })
})

describe('gameboard functionality', () => {
    test("recieveAttack" , () => {
        let gameboard = new Gameboard();
        expect(gameboard.recieveAttack(1,9)).toBe(true);
    })

    test("recieveAttack" , () => {
        let gameboard = new Gameboard();
        expect(gameboard.recieveAttack(1,10)).toBe(true);
    })

    test("recieveAttack" , () => {
        let gameboard = new Gameboard();
        expect(gameboard.recieveAttack(5,10)).toBe(false);
    })

    test("attackList" , () => {
        let gameboard = new Gameboard();
        gameboard.recieveAttack(5,10);
        gameboard.recieveAttack(2,10);
        expect(gameboard.getAttackList()).toEqual([[5,10], [2,10]]);
    })

    test("allSink" , () => {
        let gameboard = new Gameboard();

        gameboard.recieveAttack(1,1);
        gameboard.recieveAttack(2,1);
        gameboard.recieveAttack(3,1);
        gameboard.recieveAttack(4,1);
        gameboard.recieveAttack(5,1);

        gameboard.recieveAttack(1,2);
        gameboard.recieveAttack(1,3);
        gameboard.recieveAttack(1,4);
        gameboard.recieveAttack(1,5);

        gameboard.recieveAttack(6,5);
        gameboard.recieveAttack(7,5);
        gameboard.recieveAttack(8,5);

        gameboard.recieveAttack(7,8);
        gameboard.recieveAttack(7,9);
        gameboard.recieveAttack(7,10);
    

        gameboard.recieveAttack(1,9);
        gameboard.recieveAttack(1,10);
        expect(gameboard.allSink()).toBe(true);
    })

})

