import {Player, Ship} from "./battle.js"
document.addEventListener("DOMContentLoaded", () => {

let newPlayer = new Player();


let currentHighlight;
let currentSize = 1;
let currentDirection;
let placeAllowed;
let placeLocation;
let shipCoordinates = newPlayer.gameboard.getCoordinateList();

const leftSide = document.getElementById("left_side");
const rightSide = document.getElementById("right_side");

let currentId;

addGridBoxes(leftSide, newPlayer, "left");

function addGridBoxes(side, newPlayer, sideText){
    
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

function fullyRenderSide(){

}
function checkPair(x,y){
    for(const pair of shipCoordinates){
        if(pair[0] == x && pair[1] == y){
            return true;
        }
        
    }
    return false;
}

function mainMenu(){
    
}
renderGrid(leftSide,newPlayer, "left");

let debug = document.createElement("div");
rightSide.appendChild(debug);

let restrictedSquares = [];
makeRestrictedSquaresList(shipCoordinates);
function makeRestrictedSquaresList(coordList){
    
    for(const pair of coordList){
        let x = parseInt(pair[0]);
        let y = parseInt(pair[1]);

        let squareNum = (x-1)*10 + y;
        restrictedSquares.push(squareNum);

    }

    // console.log(restrictedSquares);

    // console.log()
}
function clearSquares(){
    let allSquares = document.querySelectorAll(".gridBox");
    allSquares.forEach((square) => {
        square.style.backgroundColor = "white";
    })
}

function checkCollision(squareNum, horizontal){
    let square = document.getElementById(squareNum);
    
    
    console.log(`squareNum in collision: ${squareNum}`);
    for(let i = 0; i < currentSize; i++){
        // console.log(`squareNum+i: ${squareNum+i}`);
        // console.log(`currentSize in collision: ${currentSize}`)

        if (horizontal === "true"){
            if(restrictedSquares.includes(squareNum+i)){
                return true;
            }
        }
        else{
            if(restrictedSquares.includes(squareNum+i*10)){
                return true;
            }
        }
        
    }

    return false
    

    
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

        
        currentSize = parseInt(dragShip.getAttribute("size"));

        debug.textContent = `size:${shipSize} horizontal: ${horizontal}`


        let previousSquare;

        if(currentHighlight){
            previousSquare = document.getElementById(currentHighlight);
            if(e.target.id != previousSquare){
                
                clearSquares();

            }
        }
        
        
        let targetId = e.target.id;
        if(e.target.id != "left_side" && !e.target.hasAttribute("size")){
            currentHighlight = e.target.id;
            let squareNum = parseInt(e.target.id.match(/\d+/)[0])
            // console.log(`e.target.id: ${e.target.id}`);
            

            //horizontal checking
            
            if(horizontal === "true"){
                if(((parseInt(squareNum) -1 )% 10) + parseInt(currentSize) > 10){
                
                    for(let i = squareNum; i <= parseInt((squareNum-1)/10)*10 + 10; i++ ){
                        let square = document.getElementById(`square${parseInt(i) }`);
                        square.style.backgroundColor = "red";
                        placeAllowed = false;
                        placeLocation = squareNum;
                    }
                }
                //no collision and no overflow
                else{
                    console.log(`collision: ${checkCollision(squareNum, horizontal)}`)
                    if(!checkCollision(squareNum, horizontal)){
                        for(let i = 0; i < currentSize; i++){
                            let square = document.getElementById(`square${parseInt(squareNum) + i }`);
                            
                    
                            
                        
                            square.style.backgroundColor = "green";
                            placeAllowed = true;
                            placeLocation = squareNum;
                            
                        
                    }
                    }

                    //collision check horizontal
                    else{
                        for(let i = 0; i < currentSize; i++){
    
                            if(!restrictedSquares.includes(squareNum+i)){
                                let square = document.getElementById(`square${parseInt(squareNum) + i }`);
                                square.style.backgroundColor = "red";
                                placeAllowed = false;
                                placeLocation = squareNum;
                            }     
                                          
                            
                        
                            }
                    }
                    
                    
                }
            }

            //vertical checking
            else{

                //check if overflow vertically
                if((squareNum-10) + currentSize*10 > 100){
                    console.log(`squareNum + currentSize*10:${squareNum + currentSize*10}`)
                    
                    for(let i = squareNum; i <= 100; i+= 10 ){
                        console.log(`squareNum + i: ${parseInt(i) }`)
                        let square = document.getElementById(`square${parseInt(i) }`);
                        console.log(`squaresecondId: ${square.id}`);
                        square.style.backgroundColor = "red";
                        placeAllowed = false;
                        placeLocation = squareNum;
                    }

                    
                }

                //check for collision vertically
                else{
                    if(!checkCollision(squareNum, horizontal)){
                        
                        for(let i = 0; i < currentSize; i++){
                            let square = document.getElementById(`square${parseInt(squareNum) + i*10 }`);
                            
                    
                            
                        
                            square.style.backgroundColor = "green";
                            
                            placeAllowed = true;
                            placeLocation = squareNum;
                        }
                    }

                    else{
                        for(let i = 0; i < currentSize; i++){
                            
                            if(!restrictedSquares.includes(squareNum+i*10)){
                                let square = document.getElementById(`square${parseInt(squareNum) + i*10}`);
                                square.style.backgroundColor = "red";
                                placeLocation = squareNum;
                                placeAllowed = false;
                            }     
                                          
                            
                        
                            }
                    }
                }
            }


            

        }
        
    })

    side.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("horizontal"));
        console.log(e.target.getAttribute("vertical"));
        
    })

    let shipCounter = 0;
    for(const ship of shipList){
        let coordinateArray = ship.coordinateArray();
        let coordLength = coordinateArray.length;

            let gridShip = document.createElement("div");
            gridShip.style.backgroundColor = colorList[counter];
            gridShip.style.border = "3px solid"
            gridShip.setAttribute("size", ship.getSize());
            gridShip.id = `${shipNames[shipCounter]}`;
            shipCounter += 1;
            gridShip.setAttribute("index", counter)
            gridShip.setAttribute("draggable", true);
            //horizontal direction
            console.log(`coordinateArray[0][0]: ${coordinateArray[0][0]}`)
            console.log(`coordinateArray[1][0]: ${coordinateArray[1][0]}`)
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
                console.log(`left at: ${e.target.id}`);
                console.log(`lastLocation: ${placeLocation}`);
                console.log(`allowed: ${placeAllowed}`)

                if(placeAllowed){
                    console.log("allowed true")
                    let ship = document.getElementById(e.target.id);
                    
                    let currentSquare = document.getElementById(`square${placeLocation}`);
                    let row = parseInt(currentSquare.getAttribute("horizontal"));
                    let column = parseInt(currentSquare.getAttribute("vertical"));
                    let horizontal = ship.getAttribute("horizontal");

                    
                    
                    let otherShip;
                    console.log("destroyer is the shit");
                    if(horizontal == "true"){
                        otherShip = new Ship(row,column,row,column + currentSize -1);
                    }
                    else{
                        otherShip = new Ship(row,column,row + currentSize -1,column);
                    }
                    

                    
                    newPlayer.gameboard.shipList[parseInt(ship.getAttribute("index"))] = otherShip;
                    leftSide.innerHTML = "";
                    shipCoordinates = newPlayer.gameboard.getCoordinateList();
                    restrictedSquares = [];
                    makeRestrictedSquaresList(shipCoordinates);
                    addGridBoxes(leftSide, newPlayer, "left");
                    renderGrid(leftSide, newPlayer,"left")
                    
                        
                        
                    
                }
            })

            side.appendChild(gridShip);

            counter += 1;
    }
}

});