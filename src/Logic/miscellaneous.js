//Miscellaneous assitster fiunctiosn

export const organizeBoard = (board) => {
    let row1 = []
    let row2 = []
    let row3 = []
    let row4 = []
    let row5 = []
    let row6 = []
    let row7 = []
    let row8 = []

    for(let i = 0; i < board.length; i++){
        switch(board[i].x){
            case 0:
                row1.push(board[i])
                break;
            case 1:
                row2.push(board[i])
                break;
            case 2:
                row3.push(board[i])
                break;
            case 3:
                row4.push(board[i])
                break;
            case 4:
                row5.push(board[i])
                break;
            case 5:
                row6.push(board[i])
                break;
            case 6:
                row7.push(board[i])
                break;
            case 7:
                row8.push(board[i])
                break;  
        }
    }
    const mega = [row1, row2, row3, row4, row5, row6, row7, row8]

    for(let i = 0; i < mega.length; i++){
        const row = mega[i]
        row.sort((a,b) => {
            return a.y - b.y
        })
    }
    return [...row1, ...row2, ...row3, ...row4, ...row5, ...row6, ...row7, ...row8]
}