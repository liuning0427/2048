function getPosTop(i,j){
    return 20+i*120;
}
function getPosLeft(i,j){
    return 20+j*120;
}
function getNumberBackgroundColor(number){
    switch(number){
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f25179";
            break;
        case 16:
            return "#cc1234";
            break;
        case 32:
            return "#d12341";
            break;
        case 64:
            return "#ccadee";
            break;
        case 128:
            return "#aa18899";
            break;
        case 256:
            return "#ccddee";
            break;
        case 512:
            return "#aa1100";
            break;
        case 1024:
            return "#445566";
            break;
        case 2048:
            return "#aaccae";
            break;
    }
    return "black";
}

function getNumberColor(number){
    if(number<=4){
        return "#776e65";
    }
    return "white";
}

function getScore(){
    document.getElementById("score").innerHTML = score;
}

function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true; 
}

function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0&&j!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            if(board[i][j]!=0&&j!=3){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0&&i!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0&&i!=3){
                if(board[i+1][j]==0||board[i+1][j]==board[i+1][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row,col1,col2,board){
    for(var i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}

function noBlockVertical(co1,row1,row2,board){
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!=0){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveDown(board)||canMoveUp(board)){
        return false;
    }
    return true;
}