const rollingSound = new Audio("./Sound/rpg-dice-rolling-95182.mp3");
const winSound = new Audio("./Sound/winharpsichord-39642.mp3");
const ladderMap = {
    1: 38,
    4:14,9:31,28:84,21:42,51:67,71:91,80:100
}
const snakeMap = {
    17:7,54:34,62:19,64:60,87:24,93:73,95:75,98:79
}
const Playerpiece_1 = document.getElementById('player_piece_1');
const Playerpiece_2 = document.getElementById('player_piece_2');
const player1_info = document.querySelector('#players-info #Player-1-stats');
const player2_info = document.querySelector('#players-info #Player-2-stats');

let player1Position = 0;
let player2Position = 0;
let turn = 1;
const button_value = document.querySelector('.dice-container button');
function createMatrix() {
    const MatrixArray = [];
    const n = 10;
    let value = 100;
    for (let row = 0; row < n; row++) {
        let row_matrix = [];
        if (row % 2 == 0) {
            for (let col = 0; col < n; col++) {
                row_matrix.push(value);
                // console.log("Odd row: "+value);
                value--;
            }
        }
        else {
            for (let col = 0; col < n; col++) {
                row_matrix.unshift(value);
                // console.log("Even Row: "+value);
                value--;
            }
        }

        MatrixArray.push(row_matrix);

    }
    return MatrixArray;
}
function createBoard()
{
    let board = document.querySelector('.main-board');
    const ArrayMatrix = createMatrix();
    board.innerHTML = "";
    ArrayMatrix.map((row) => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
           
        row.map((block) => {
            const blockElement = document.createElement('div');
            blockElement.classList.add("block");
            blockElement.dataset.value = block;
            // blockElement.textContent = block;
            rowElement.appendChild(blockElement);
        });
        board.appendChild(rowElement);
    });
    // intitalizePlayerPosition();
    
}
function isGameover(newPosition)
{
    if (newPosition ===101) {
        return true;
    }
    else
        return false;
        
}
function movePlayer(dice_value,currPlayer)
{
    if (currPlayer == "Player 1")
    {
        let newPosition = player1Position + dice_value;//diff
    if (newPosition > 101)
    {
        return;
    }    
    else if (isGameover(newPosition))
    {
        winSound.play();
        setTimeout(() => {
            window.alert("Player 1 Wins ");//diff
            // document.location.reload();
            
        }, 1000);
        // console.log("new position is " + newPosition);
        return;
    }
    player1Position = ladderMap[newPosition] || snakeMap[newPosition] || newPosition;//diff
    // console.log(newPosition);
    let player_pos_stats = player1_info.querySelector(".position-stats");
        player_pos_stats.innerText = `${player1Position}`;  
        playerMovement(player1Position, Playerpiece_1);
   
    }
    else if (currPlayer == "Player 2")
    {
        let newPosition = player2Position + dice_value;//diff
        if (newPosition > 101)
        {
            return;
        }    
        else if (isGameover(newPosition))
        {
            winSound.play();
            setTimeout(() => {
                window.alert("Player 2 Wins ");//diff
                // document.location.reload();
                
            }, 1000);
            // console.log("new position is " + newPosition);
            return;
        }
        player2Position = ladderMap[newPosition] || snakeMap[newPosition] || newPosition;//diff
        // console.log(newPosition);
        let player_pos_stats = player2_info.querySelector(".position-stats");
        player_pos_stats.innerText = `${player2Position}`; 
        playerMovement(player2Position, Playerpiece_2);
       
    }
        
   
}
function playerMovement(PlayerPosition,PlayerPiece)
{
    const square = document.querySelector(`.block[data-value="${PlayerPosition}"]`);
        if (square) {
    
            if (PlayerPiece.parentNode) {
                PlayerPiece.parentNode.removeChild(PlayerPiece);
              square.appendChild(PlayerPiece);
            }
          } else {
            console.warn('Invalid new position for player. Position remains unchanged.');
          }  
}
function Getrandom()
{
    let dice_value = Math.floor(Math.random() * 6 )+1;
    let dice_img = document.getElementById("dice-id");
    dice_img.setAttribute("src", `../assessts/dice${dice_value}.png`);
    
    button_value.textContent = dice_value;
    return dice_value;
 }
function roll()
{
    rollingSound.play();
    var dice_count = Getrandom();
    var currPlayer="";
    if (turn % 2 === 0)
    {
        currPlayer = "Player 2";
        let player2_dice_stats = player2_info.querySelector(".dice-stats");
        player2_dice_stats.innerText = `${dice_count}`;
    }
    else
    {
        currPlayer = "Player 1"; 
        let player1_dice_stats = player1_info.querySelector(".dice-stats");
        player1_dice_stats.innerText = `${dice_count}`;
    }
    button_value.textContent = currPlayer;
    turn++;
    setTimeout(() => {
        movePlayer(dice_count,currPlayer);
        
    },1000)
}