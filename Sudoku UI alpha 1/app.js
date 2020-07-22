const cells = document.querySelectorAll('.cell')
const solveButton = document.getElementById('solve')
let cellsArray = Array.prototype.slice.call(cells)
let board = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0], 
    [6, 0, 0, 0, 7, 5, 0, 0, 9], 
    [0, 0, 0, 6, 0, 1, 0, 7, 8], 
    [0, 0, 7, 0, 4, 0, 2, 6, 0], 
    [0, 0, 1, 0, 5, 0, 9, 3, 0], 
    [9, 0, 4, 0, 6, 0, 0, 0, 5], 
    [0, 7, 0, 3, 0, 0, 0, 1, 2], 
    [1, 2, 0, 0, 0, 7, 4, 0, 0], 
    [0, 4, 9, 2, 0, 6, 0, 0, 7]
]

Array.prototype.reshape = function(rows, cols) {
    let copy = this.slice(0)
    this.length = 0
    for (let r=0; r<rows; r++) {
        let row = []
        for (let c=0; c<cols; c++) {
            let i = r*cols + c
            if (i < copy.length) {
                row.push(copy[i])
            }
        }
        this.push(row)
    }
}

cellsArray.reshape(9, 9)
console.log(cellsArray)


for (let i=0; i<board.length; i++) {
   for (let j=0; j<board[i].length; j++) {
        if (board[i][j] == 0) {
           cellsArray[i][j].innerHTML = ""
        }
        else {
            cellsArray[i][j].innerHTML = board[i][j]
        }
   }
}

function solve(board) {
    // console.log(board)
    let emptyCellPosition = findEmptyCell(board)
    console.log(emptyCellPosition)
    if (emptyCellPosition == null) 
        return true
    let row = emptyCellPosition[0]
    let col = emptyCellPosition[1]

    for (let num=1; num<10; num++) {
        if (isValid(board, num, emptyCellPosition)) {
            board[row][col] = num
            if (solve(board))
                return true
            board[row][col] = 0
        }
    }
    return false
}

function isValid(board, num, position) {
    for (let i=0; i<board.length; i++) {
        if (board[position[0]][i] == num && position[1] != i) {
            return false
        }
        if (board[i][position[1]] == num && position[0] != i) {
            return false
        }
    }
    hCell = Math.floor(position[1] / 3)
    vCell = Math.floor(position[0] / 3)
    for (let i=vCell*3; i<vCell*3+3; i++) {
        for (let j=hCell*3; j<hCell*3+3; j++) {
            if (board[i][j] == num && [i, j] == position) {
                return false
            }
        }
    }
    return true
}

function findEmptyCell(board) {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            if (board[i][j] == 0) {
                return [i, j]
            }
        }
    }
    return null
}

function updateBoard() {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            cellsArray[i][j].innerHTML = board[i][j]
        }
    }
}

solveButton.addEventListener('click', function() {
    solve(board)
    // console.log(board)
    updateBoard()
})