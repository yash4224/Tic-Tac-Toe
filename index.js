const newGameBtn = document.querySelector(".btn");
const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to initialise the game
function starting(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // screen pe empty bhi dekhana pdega
    boxes.forEach((box, index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList.remove("win");
        
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
starting();

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    })
});

function swap(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGame(){
    let answer="";
    winningPosition.forEach((position)=>{
        //check all three boxes are empty and exactly same value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // check if winner is x
            if(gameGrid[position[2]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            // disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            // for green color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        gameInfo.innerText=`Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // if game is tie
    let count=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            count++;
        }
    })

    if(count===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }


}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap player
        swap();
        // check for winning
        checkGame();

    }
}
newGameBtn.addEventListener('click', starting);