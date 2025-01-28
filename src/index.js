import {Player, Ship} from "./battle.js"
document.addEventListener("DOMContentLoaded", () => {

let playerOne = new Player();
let playerTwo = new Player();

let currentHighlight;
let currentSize = 1;
let currentDirection;
let placeAllowed;
let placeLocation;


const leftSide = document.getElementById("left_side");
const rightSide = document.getElementById("right_side");

let restrictedSquares = [];

fullyRenderSide(leftSide, playerOne);
fullyRenderSide(rightSide, playerTwo);

let currentId;


function addGridBoxes(side,coords){
    
    for(let i = 1; i <= 10; i++){
        for(let j = 1; j <= 10; j++){
            if(checkPair(i,j,coords) == false){
                let gridBox = document.createElement("div");
                gridBox.classList.add("gridBox");
                gridBox.setAttribute("horizontal", `${i}`);
                gridBox.setAttribute("vertical", `${j}`);
                if(side.id == "left_side"){
                    gridBox.id = `Lsquare${(i-1)* 10 + (j)}`
                }
                else{
                        gridBox.id = `Rsquare${(i-1)* 10 + (j)}`
                }
                
                gridBox.vertical = j;
            
                side.appendChild(gridBox);
            }
            
            
        }
    }
}

function fullyRenderSide(side, player){
    side.innerHTML = "";
    let shipCoordinates = player.gameboard.getCoordinateList();
    

    restrictedSquares = [];
    makeRestrictedSquaresList(shipCoordinates);
    addGridBoxes(side,shipCoordinates)
    renderGrid(side, player)
}


function checkPair(x,y, shipCoordinates){
    for(const pair of shipCoordinates){
        if(pair[0] == x && pair[1] == y){
            return true;
        }
        
    }
    return false;
}

function mainMenu(){
    
}
// renderGrid(leftSide,newPlayer, "left");

// let debug = document.createElement("div");
// rightSide.appendChild(debug);


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
function renderGrid(side, player){
    const shipList = player.gameboard.shipList;
    let counter = 0;
    let colorList = ["gray", "blue", "orange", "red", "yellow"];
    let shipNames = ["carrier", "battleship", "destroyer", "submarine" ,"patrol"]
    
    let sideText;
    if(side.id == "left_side"){
        sideText = "L";
    }
    else{
        sideText = "R"
    }
    side.addEventListener("dragover", (e) => {
        
        e.preventDefault(); // Allow drop
        
        
        let dragShip = document.getElementById(currentId);
        
        let shipSize = dragShip.getAttribute("size");

        let horizontal = dragShip.getAttribute("horizontal");

        
        currentSize = parseInt(dragShip.getAttribute("size"));



        let previousSquare;

        if(currentHighlight){
            previousSquare = document.getElementById(currentHighlight);
            if(e.target.id != previousSquare){
                
                clearSquares();

            }
        }
        
        
        let targetId = e.target.id;

        console.log(`dragShip.id: ${dragShip.id} e.target.id[0]${e.target.id[0]}`);
        if (dragShip.id[0] != e.target.id[0]) {
            placeAllowed = false;
            return;
             // Skip processing for elements not within this side
        }

        if((side.contains(e.target)) && !e.target.hasAttribute("size")){
            currentHighlight = e.target.id;
            let squareNum = parseInt(e.target.id.match(/\d+/)[0])
            console.log(`e.target.id: ${e.target.id}`);
            

            //horizontal checking
            
            if(horizontal === "true"){
                if(((parseInt(squareNum) -1 )% 10) + parseInt(currentSize) > 10){
                
                    for(let i = squareNum; i <= parseInt((squareNum-1)/10)*10 + 10; i++ ){
                        
                        let square = document.getElementById(`${sideText}square${parseInt(i) }`);
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
                            let square = document.getElementById(`${sideText}square${parseInt(squareNum) + i }`);
                            
                    
                            
                        
                            square.style.backgroundColor = "green";
                            placeAllowed = true;
                            placeLocation = squareNum;
                            
                        
                    }
                    }

                    //collision check horizontal
                    else{
                        for(let i = 0; i < currentSize; i++){
    
                            if(!restrictedSquares.includes(squareNum+i)){
                                let square = document.getElementById(`${sideText}square${parseInt(squareNum) + i }`);
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
                        let square = document.getElementById(`${sideText}square${parseInt(i) }`);
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
                            let square = document.getElementById(`${sideText}square${parseInt(squareNum) + i*10 }`);
                            
                    
                            
                        
                            square.style.backgroundColor = "green";
                            
                            placeAllowed = true;
                            placeLocation = squareNum;
                        }
                    }

                    else{
                        for(let i = 0; i < currentSize; i++){
                            
                            if(!restrictedSquares.includes(squareNum+i*10)){
                                let square = document.getElementById(`${sideText}square${parseInt(squareNum) + i*10}`);
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
            gridShip.id = `${sideText+ shipNames[shipCounter]}`;
            shipCounter += 1;
            gridShip.setAttribute("index", counter)
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

            //click to flip direction
            gridShip.addEventListener("click", (e) => {
                let size = parseInt(gridShip.getAttribute("size"))
                let gridShipSquares = [];
                for(const pair of coordinateArray){
                    let x = parseInt(pair[0]);
                    let y = parseInt(pair[1]);

                    gridShipSquares.push((x-1)*10 + y );

                }
                console.log(`Restricted Squares: ${restrictedSquares}`)
                console.log(`gridShipSquares: ${gridShipSquares}`)
                console.log(`coordinateArray: ${coordinateArray}`)
                
                
                let shipHorizontal = gridShip.getAttribute("horizontal");

                //flip to horizontal
                if(shipHorizontal == "false"){
                    console.log("vertical");
                    for(let i = 0; i < size; i++){
                        
                        let x = parseInt(coordinateArray[i][0]);
                        let y = parseInt(coordinateArray[i][1]);
                        let currentNum = (x-1) * 10 + y;
                        let workingNum;
                        console.log(`currentNum: ${currentNum}`)
                        console.log(`y + size - 1: ${y + size - 1}`)
                        let collision = false;

                        //check if can flip to right
                        if(y + size - 1 <= 10){
                            console.log("no overflow to the right")
                            for(let j = 0; j < size; j++){
                                if(!gridShipSquares.includes(currentNum + j)){
                                    if(restrictedSquares.includes(currentNum + j)){
                                        collision = true;
                                        break;
                                    }
                                }
                            }
                            
                            if(!collision){
                                let otherShip = new Ship(x,y,x,y+size-1);
                                player.gameboard.shipList[parseInt(gridShip.getAttribute("index"))] = otherShip;
                        
                                fullyRenderSide(side,player);
                                console.log("got to the end")
                                break;
                            }
                        }

                        //check left 
                        else if(y - (size - 1) > 0){
                            console.log("no overflow to the left")
                            for(let j = 0; j < size; j++){
                                if(!gridShipSquares.includes(currentNum - j)){
                                    if(restrictedSquares.includes(currentNum - j)){
                                        collision = true;
                                        break;
                                    }
                                }
                            }
                            
                            if(!collision){
                                let otherShip = new Ship(x,y - size+1,x,y);
                                player.gameboard.shipList[parseInt(gridShip.getAttribute("index"))] = otherShip;
                        
                                fullyRenderSide(side,player);
                                console.log("got to the end")
                                break;
                            }
                        }
                          
                    }
                }

                //flip to vertical
                else{
                    console.log("horizontal")
                    for(let i = 0; i < size; i++){
                        
                        let x = parseInt(coordinateArray[i][0]);
                        let y = parseInt(coordinateArray[i][1]);
                        let currentNum = (x-1) * 10 + y;
                        let workingNum;
                        console.log(`currentNum: ${currentNum}`)
                        console.log(`x - size: ${x - size}`)
                        let collision = false;

                        //check if can flip up
                        if(x - size >= 0){
                            console.log("no overflow up")
                            for(let j = 0; j < size; j++){
                                console.log(`currentNum + j*10: ${currentNum + j*10}`)
                                if(!gridShipSquares.includes(currentNum - j*10)){
                                    if(restrictedSquares.includes(currentNum - j*10)){
                                        collision = true;
                                        break;
                                    }
                                }
                            }
                            
                            if(!collision){
                                let otherShip = new Ship(x - size +1,y,x,y);
                                player.gameboard.shipList[parseInt(gridShip.getAttribute("index"))] = otherShip;
                        
                                fullyRenderSide(side,player);
                                console.log("got to the end")
                                break;
                            }
                        }

                        //check if can flip down
                        else if(x + size <= 10){
                            console.log("no overflow to the down")
                            for(let j = 0; j < size; j++){
                                if(!gridShipSquares.includes(currentNum + j*10)){
                                    if(restrictedSquares.includes(currentNum + j*10)){
                                        collision = true;
                                        break;
                                    }
                                }
                            }
                            
                            if(!collision){
                                let otherShip = new Ship(x,y,x+size-1,y);
                                player.gameboard.shipList[parseInt(gridShip.getAttribute("index"))] = otherShip;
                        
                                fullyRenderSide(side,player);
                                console.log("got to the end")
                                break;
                            }
                        }
                          
                    }
                }
            })
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
                    
                    let currentSquare = document.getElementById(`${sideText}square${placeLocation}`);
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
                    

                    
                    player.gameboard.shipList[parseInt(ship.getAttribute("index"))] = otherShip;
                    
                    fullyRenderSide(side,player);
                    
                        
                        
                    
                }
            })

            side.appendChild(gridShip);

            counter += 1;
    }
}

});