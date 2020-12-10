var ball;
var database;
var  balldb;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
//ref - point db, on - listen (values - pos - x&y)
    balldb = database.ref('ball/position');
    balldb.on("value",readPosition);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//write to the database ( arrow key pressed)
function writePosition(x,y){
database.ref('ball/position').set({
    x : position.x + x,
    y : position.y + y
})
}

//read from the database - x-200,y -200
function readPosition(data){
position = data.val();
ball.x = position.x;
ball.y = position.y;
}