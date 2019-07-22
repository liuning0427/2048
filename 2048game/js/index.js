var board = new Array(); //用来存放初始化的格子的数组
var added = new Array(); //用来存放合并数字的数组
var score = 0;
var top = 240;

$(document).ready(function(e){
    newgame();
});

function newgame(){ //初始化棋盘
    init();
    generateOneNumber(); //随机生成两个数字
    generateOneNumber();
}

// i代表行，j代表列;
function init(){
    score=0;
    document.getElementById("score").innerHTML = score;
    $("#gameover").css('display','none');
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){ //初始化格子数组
        board[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
        }
    }
    for(var i=0;i<4;i++){ //初始化判定合并的数组
        added[i]=new Array();
        for(var j=0;j<4;j++){
            added[i][j]=0;
        }
    }
    updateBoardView();///通知前端对board二位数组进行设定。
}

function updateBoardView(){ //更新数组前端的样式
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#box").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','75px');
                theNumberCell.css('height','75px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(board[i],[j]));//返回前景色
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber(){ //生成随机的格子
    if(nospace(board)){
        return false;
    }
    var randx = parseInt(Math.floor(Math.random()*4)); //返回一个0到3之间的随机数
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randx][randy]==0){ 
            break;
        }
        var randx = parseInt(Math.floor(Math.random()*4)); 
        var randy = parseInt(Math.floor(Math.random()*4));
        //如果随机生成的位置坐标为0，0，重新生成棋盘
    }
    var randNumber = Math.random() < 0.5? 2 : 4;//随机生成一个数字，如果生成的数字小于0.5，则返回2，否则返回4
    board[randx][randy] = randNumber; 
    showNumberWithAnimation(randx,randy,randNumber);//在随机生成的位置显示随机生成的数字；
    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:  //left键
        if(moveLeft()){
            getScore(); //获得分数
            generateOneNumber(); //每次新增一个数字就可能显示游戏结束,如果随机数字生成成功，则返回true，并具体生成数字；否则返回false。
            setTimeout('isGameOver()',300);
        }
        break;
        case 38:  //向上键；
        if(moveUp()){
            getScore(); 
            generateOneNumber(); 
            setTimeout('isGameOver()',300);
        }
        break;
        case 39: //right
        if(moveRight()){
            getScore(); 
            generateOneNumber(); 
            setTimeout('isGameOver()',300);
        }
        break;
        case 40: //dowm
        if(moveDown()){
            getScore(); 
            generateOneNumber(); 
            setTimeout('isGameOver()',300);
        }
        break;
    }
})

function isGameOver(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    $("#gameover").css('display','block');
}

function isAddedArray(){ //把合并的数组置为0
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            added[i][j]=0;
        }
    }
}

function moveLeft(){
    if(!canMoveLeft(board))
        return false;
    isAddedArray();
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){ //第一列数字不能向左移动
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){ //i,j左侧的部位
                    if(board[i][k]==0&&noBlockHorizontal(i , k, j, board)){ //落脚的地方为空&&中间没有障碍物
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][k];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i , k, j, board)){ //落脚的地方和和原来的数字相等&&中间没有障碍物
                        showMoveAnimation(i,j,i,k);
                        if(added[i][k]!=0){
                            board[i][k+1]=board[i][j];
                            board[i][j]=0;
                        }else{
                            board[i][k]+=board[i][j];;
                            board[i][j]=0;
                            added[i][k]=1;
                            score+=board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true; 
}

function moveRight(){
    if(!canMoveRight(board)) //判断格子是否能够向右移动；
        return false;
    isAddedArray();
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){ //i,i右侧的元素
                    if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        if(added[i][k]!=0){
                            board[i][k-1]=board[i][j];
                            board[i][j]=0;
                        }else{
                            board[i][k]+=board[i][j];
                            board[i][j]=0;
                            added[i][k]=1;
                            score+=board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board))
        return false;
    isAddedArray();
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockHorizontal(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockHorizontal(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        if(added[k][j]!=0){
                            board[k+1][j]=board[i][j];
                            board[i][j]=0;
                        }else{
                            board[k][j]+=board[i][j];
                            board[i][j]=0;
                            added[k][j]=1;
                            score+=board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board))
        return false;

    isAddedArray();
    for(var j=0;j<4;j++){
        for(var i=2;i>=9;i--){
            if(board[k][j]==0&&noBlockHorizontal(j,i,k,board)){
                showMoveAnimation(i,j,k,j);
                board[k][j]=board[i][j];
                board[i][j]=0;
                continue;
            }else if(board[k][j]==board[i][j]&&noBlockHorizontal(j,i,k,board)){
                showMoveAnimation(i,j,k,j);
                if(added[k][j]!=0){
                    board[k-1][j]=board[i][j];
                    board[i][j]=0;
                }else{
                    board[k][j]+=board[i][j];
                    board[i][j]=0;
                    added[k][j]=1;
                    score += board[k][j];
                }
                continue;
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}