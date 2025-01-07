import {Player} from "./battle.js"

console.log("testing");
let newPlayer = new Player();

newPlayer.gameboard.recieveAttack(1,1);

console.log(newPlayer.gameboard.getAttackList());

console.log()


const leftSide = document.getElementById("left_side");
const rightSide = document.getElementById("right_side");


// let newShip = document.createElement("div");
// newShip.style.backgroundColor = "black";
// newShip.style.gridRow = `1 / 4`
// leftSide.appendChild(newShip);

addGridBoxes(leftSide,"left");
addGridBoxes(rightSide, "right");
function addGridBoxes(side, sideText){
    for(let i = 1; i <= 10; i++){
        for(let j = 1; j <= 10; j++){
            let gridBox = document.createElement("div");
            gridBox.classList.add("gridBox");
            gridBox.setAttribute("horizontal", `${i}`);
            gridBox.setAttribute("vertical", `${j}`);
            gridBox.setAttribute("side", sideText);
            gridBox.vertical = j;
            
            side.appendChild(gridBox);
            
        }
    }
}

function mainMenu(){
    
}
renderGrid(leftSide,newPlayer, "left");

// renderGrid(rightSide, newPlayer, "right");

function renderGrid(side, player, sideText){
    const shipList = player.gameboard.shipList;
    let counter = 0;
    let colorList = ["gray", "blue", "orange", "red", "yellow"];

    for(const ship of shipList){
        let coordinateArray = ship.coordinateArray();
        let coordLength = coordinateArray.length;

        console.log(coordinateArray);
        console.log(`coordinateArray[0][0]: ${coordinateArray[0][0]}`);
        console.log(`coordinateArray[1][0]: ${coordinateArray[1][0]}`);
        // for(const pair of coordinateArray){
       
           

            let gridShip = document.createElement("div");
            gridShip.style.backgroundColor = colorList[counter];
            gridShip.style.border = "3px solid"
            gridShip.setAttribute("size", ship.getSize());
            

            if(coordinateArray[0][0] == coordinateArray[1][0]){
                console.log("first");
                gridShip.style.gridRow = `${coordinateArray[0][0]} / ${coordinateArray[0][0]}`;
                gridShip.style.gridColumn = `${coordinateArray[0][1]} / ${coordinateArray[coordLength-1][1] + 1}`;
            }
            else{
                gridShip.style.gridRow = `${coordinateArray[0][0]} / ${coordinateArray[coordLength-1][0] + 1}`;
                gridShip.style.gridColumn = `${coordinateArray[0][1]} / ${coordinateArray[0][1]}`;
                
            }
            

            side.appendChild(gridShip);


            // let gridBox = document.querySelector(`[horizontal="${pair[0]}"][vertical="${pair[1]}"][side="${sideText}"]`);
            // gridBox.style.backgroundColor = colorList[counter]
            // gridBox.classList.add("highlighted")
            // console.log(gridBox);
        
        counter += 1;
    }
}
