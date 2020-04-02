const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = 'rgb(114,114,144)';
const colors = ["red", "green", "blue"];
function rad(deg){
    return deg * Math.PI / 180;
}
class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const start = new Vector2(canvas.width/2, canvas.height);

function drawLine(begPos, length, angle, color){
    var endPos = new Vector2(
        begPos.x + Math.sin(rad(angle)) * length,
        begPos.y + Math.cos(rad(angle)) * length
    );
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(begPos.x, begPos.y);
    ctx.lineTo(endPos.x, endPos.y);
    ctx.stroke();
    ctx.closePath();
    return endPos;
}
function rndInt(min, max){
    val1 = Math.floor(Math.floor(max) * Math.random());
    if(val1 < min) val1 = max - min + val1;
    return val1;
}

var begLength = 100;
var begColorPos = 0;
var maxDepth = 5;
var branching = 5;
var lengthNext = 0.5;
var c = 180 / (branching + 1);

const rndLen = [50, 125];
const rndMaxDepth = [2, 6];
const rndBranching = [2, 7];
const rndNextPos = [10, 50];

function branch(begPos, length, angle, colorPos, currentDepth){
    var endPos = drawLine(begPos, length, angle, colors[colorPos]);
    if(currentDepth === maxDepth)return;
    for(var i=270 - c; i >= 90 + c; i -= c){
        branch(endPos, length * lengthNext, i, (colorPos + 1 < colors.length) ? colorPos + 1 : 0, currentDepth+1);
    }
}

//branch(start, begLength, 180, begColorPos, 1);

function randomizeLevel(){
    ctx.fillRect(0,0,canvas.width, canvas.height);
    var currentPos = new Vector2(0,canvas.height);
    for(;currentPos.x <= canvas.width;){
        begLength = rndInt(rndLen[0],rndLen[1]);
        begColorPos = rndInt(0,colors.length);
        maxDepth = rndInt(rndMaxDepth[0],rndMaxDepth[1]);
        branching = rndInt(rndBranching[0],rndBranching[1]);
        lengthNext = Math.random();
        c = 180 / (branching + 1);
        branch(currentPos, begLength, 180, begColorPos, 0);
        currentPos.x += rndInt(rndNextPos[0], rndNextPos[1]);
    }
}

randomizeLevel();