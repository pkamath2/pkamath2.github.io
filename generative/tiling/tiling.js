let height = 1000;
let width = 1000;
let size = 10;
let count = 1000;
let colors = ['#ffd1d8', '#b4ecb4', "#80f4ff"]

function setup(){
    canvas = createCanvas(height,width);
    canvas.position(345,55);
    noLoop();
}


function draw(){
    for(var i=0;i<height/size; i++){
       for(var j=0;j<width/size; j++){
            tile(i*size, j*size, random([0,1,2])*PI/2)
       }
    }
        
}

function tile(x, y, angle){
    push();
    noStroke();
    fill(random(colors));
    translate(x, y);
    translate(size/2, size/2);
    rotate(angle);
    translate(-size/2, -size/2);
    triangle(size, 0 , size, size, 0, size);
    pop();
}