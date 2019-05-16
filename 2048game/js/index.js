var board = new Array();
var add = new Array();
var score = 0;
var top = 240;

$(document).ready(function(e){
    newgame();
});

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

// i代表行，j代表列;
function init(){
    score=0;
    document.getElementById("score").innerHTML = score;
    $("gameover").css('display','none');
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("grid-cell"+i+"-"+j);
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
        $("#box").append('<li class="grid-cell" id="grid-cell-'+i+'-'+j+'"></li>');
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
            theNumberCell.css('background',getNumberBackgroundColor(board[i],[j]));//返回背景色
            theNumberCell.css('background',getNumberColor(board[i],[j]));//返回前景色
            theNumberCell.text(borad[i],[j]);
        }
    }
}

function generateOneNumber(){ //生成随机的格子
    if(nospace(board)){
        return false;
    }
    var randX = parseInt(Math.floor(Math.random()*4)); //返回一个0到3之间的随机数
    var randY = parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randX][randY]==0){ 
            break;
        }
        var randX = parseInt(Math.floor(Math.random()*4)); 
        var randY = parseInt(Math.floor(Math.random()*4));
        //如果随机生成的位置坐标为0，0，重新生成棋盘
    }
    var randNumber = Math.random() < 0.5? 2 : 4;//随机生成一个数字，如果生成的数字小于0.5，则返回2，否则返回4
    board[randX][randY] = randNumber; 
    showNumberWithAnimation(randX,randY,randNumber);//在随机生成的位置显示随机生成的数字；
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
        if(moveTop()){
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
    if(!canMoveLeft(board)){
        return false;
    }
    isAddedArray();
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){ //第一列数字不能向左移动
            
        }
    }
}