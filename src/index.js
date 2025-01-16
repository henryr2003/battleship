import {Player} from "./battle.js"
document.addEventListener("DOMContentLoaded", () => {
    // Your drag-and-drop logic here

// console.log("testing");
let newPlayer = new Player();

newPlayer.gameboard.recieveAttack(1,1);
let currentHighlight;
let currentSize = 1;
let currentDirection;
// console.log(newPlayer.gameboard.getAttackList());

let shipCoordinates = newPlayer.gameboard.getCoordinateList();

// console.log(`shipCoordinates: ${shipCoordinates}`);

// console.log()


const leftSide = document.getElementById("left_side");
const rightSide = document.getElementById("right_side");

let currentId;

// for(const pair of shipCoordinates){
//     console.log(`pair: ${pair}`);
    
    
// }
// let newShip = document.createElement("div");
// newShip.style.backgroundColor = "black";
// newShip.style.gridRow = `1 / 4`
// leftSide.appendChild(newShip);

addGridBoxes(leftSide, newPlayer, "left");

function addGridBoxes(side, newPlayer, sideText){

    // let shipCoordinates = newPlayer.gameboard.getCoordinateList();

    // console.log(`shipCoordinates: ${shipCoordinates}`);

    
    for(let i = 1; i <= 10; i++){
        for(let j = 1; j <= 10; j++){
            if(checkPair(i,j) == false){
                let gridBox = document.createElement("div");
                gridBox.classList.add("gridBox");
                gridBox.setAttribute("horizontal", `${i}`);
                gridBox.setAttribute("vertical", `${j}`);
                gridBox.setAttribute("side", sideText);
                gridBox.id = `square${(i-1)* 10 + (j)}`
                gridBox.vertical = j;
            
                side.appendChild(gridBox);
            }
            
            
        }
    }
}
function checkPair(x,y){
    for(const pair of shipCoordinates){
        // console.log(`pair: ${pair}`);
        // console.log(`compare: ${[x,y]}`);
        // console.log(`pair[1]: ${pair[1]}`)
        if(pair[0] == x && pair[1] == y){
            // console.log("pair is true");
            return true;
        }
        
    }
    return false;
}

function mainMenu(){
    
}
renderGrid(leftSide,newPlayer, "left");

// renderGrid(rightSide, newPlayer, "right");

// addGridBoxes(rightSide, newPlayer, "right");


let debug = document.createElement("div");
rightSide.appendChild(debug);

function clearSquares(){
    let allSquares = document.querySelectorAll(".gridBox");
    allSquares.forEach((square) => {
        square.style.backgroundColor = "white";
    })
}

function checkCollision(squareNum, horizontal){
    let square = document.getElementById(squareNum);
    
    if (horizontal){
        for(let i = 0; i < currentSize; i++){
            let tempSquare = document.getElementById(`square${squareNum+i}`);
            let horizontal = tempSquare.getAttribute("horizontal");
            let vertical = tempSquare.getAttribute("vertical");

            if (checkPair(horizontal, vertical)){
                return true;
            }
        }

        return falsei8jum8jmumu8m
    }
}
function renderGrid(side, player, sideText){
    const shipList = player.gameboard.shipList;
    let counter = 0;
    let colorList = ["gray", "blue", "orange", "red", "yellow"];
    let shipNames = ["carrier", "battleship", "destroyer", "submarine" ,"patrol"]
    

    side.addEventListener("dragover", (e) => {
        e.preventDefault(); // Allow drop
        
        
        let dragShip = document.getElementById(currentId);
        
        let shipSize = dragShip.getAttribute("size");

        let horizontal = dragShip.getAttribute("horizontal");

        let currentSize = parseInt(dragShip.getAttribute("size"));
        debug.textContent = `size:${shipSize} horizontal: ${horizontal}`


        if(e.target.hasAttribute("size")){
            // currentSize = e.target.getAttribute("size");
            // currentDirection = e.target.getAttribute("horizontal");
            // debug.textContent = `size: ${e.target.getAttribute("size")} dir: ${currentDirection}`
            
            
        }
        
        // console.log(`horizontal: ${e.target.getAttribute("horizontal")}`);
        // console.log(`vertical: ${e.target.getAttribute("vertical")}`);
        let previousSquare;

        if(currentHighlight){
            previousSquare = document.getElementById(currentHighlight);
            // console.log(`previousSquare: ${previousSquare.id}`);
            if(e.target.id != previousSquare){
                
                clearSquares();
                // previousSquare.style.backgroundColor = "white";

            }
        }
        
        
        let targetId = e.target.id;
        if(e.target.id != "left_side" && !e.target.hasAttribute("size")){
            currentHighlight = e.target.id;
            let squareNum = parseInt(e.target.id.match(/\d+/)[0])
            console.log(`e.target.id: ${e.target.id}`);
            console.log(`squareId: ${squareNum}`);
            console.log(`(squareNum % 10) + currentSize : ${((parseInt(squareNum) -1 )% 10) + parseInt(currentSize)}`)

            
            //horizontal checking
            if(((parseInt(squareNum) -1 )% 10) + parseInt(currentSize) > 10){
                console.log(`10 - squareNum % 10:${10 - squareNum % 10 + 1}`)
                console.log(`parseInt(squareNum/10) + 10: ${parseInt(squareNum/10)*10 + 10}`);

                for(let i = squareNum; i <= parseInt((squareNum-1)/10)*10 + 10; i++ ){
                    console.log(`squareNum + i: ${parseInt(i) }`)
                    let square = document.getElementById(`square${parseInt(i) }`);
                    console.log(`squaresecondId: ${square.id}`);
                    square.style.backgroundColor = "red";
                }
            }

            //vertical checking

            



            //check if colliding with ships
            else if (!squareNum){

            }
            else{
                console.log(`currentSize: ${currentSize}`)
                for(let i = 0; i < currentSize; i++){
                    let square = document.getElementById(`square${parseInt(squareNum) + i }`);
                    console.log(`squaresecondId: ${square.id}`);
                    square.style.backgroundColor = "green";
                }
                e.target.style.backgroundColor = "green";
                
            }
            

        }
        
    })

    side.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("horizontal"));
        console.log(e.target.getAttribute("vertical"));
        
    })


    for(const ship of shipList){
        let coordinateArray = ship.coordinateArray();
        let coordLength = coordinateArray.length;

        // console.log(coordinateArray);
        // console.log(`coordinateArray[0][0]: ${coordinateArray[0][0]}`);
        // console.log(`coordinateArray[1][0]: ${coordinateArray[1][0]}`);
        // for(const pair of coordinateArray){
       
           

            let gridShip = document.createElement("div");
            gridShip.style.backgroundColor = colorList[counter];
            gridShip.style.border = "3px solid"
            gridShip.setAttribute("size", ship.getSize());
            gridShip.id = `${shipNames[counter]}`;
            gridShip.setAttribute("draggable", true);
            //horizontal direction
            if(coordinateArray[0][0] == coordinateArray[1][0]){
                gridShip.setAttribute("horizontal", true);
                
                // console.log("first");
                gridShip.style.gridRow = `${coordinateArray[0][0]} / ${coordinateArray[0][0]}`;
                gridShip.style.gridColumn = `${coordinateArray[0][1]} / ${coordinateArray[coordLength-1][1] + 1}`;
            }
            else{
                gridShip.setAttribute("horizontal", false);
                gridShip.style.gridRow = `${coordinateArray[0][0]} / ${coordinateArray[coordLength-1][0] + 1}`;
                gridShip.style.gridColumn = `${coordinateArray[0][1]} / ${coordinateArray[0][1]}`;
                
            }
            
            gridShip.addEventListener("dragstart", (e) => {
                currentId = e.target.id;
                
            })

            gridShip.addEventListener("dragend", (e) => {
                clearSquares();
            })

            side.appendChild(gridShip);


            // let gridBox = document.querySelector(`[horizontal="${pair[0]}"][vertical="${pair[1]}"][side="${sideText}"]`);
            // gridBox.style.backgroundColor = colorList[counter]
            // gridBox.classList.add("highlighted")
            // console.log(gridBox);
        
            counter += 1;
    }
}

});