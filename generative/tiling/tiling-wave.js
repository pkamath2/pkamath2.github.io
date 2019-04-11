let height = 700;
let width = 1500;
let size = 10;
let colors = ['black']
let density = 0.02;

function setup(){
    canvas = createCanvas(width,height);
    //canvas.position(475,55);
    canvas.position(0,55);
    noLoop();
    background('pink')
}


function draw(){
    for(var i=0;i<height/size; i++){
       for(var j=0;j<width/size; j++){
            tile(i*size, j*size, random([0,1,2,3]))
       }
    }
        
}

function tile(x, y, orientation){
    var angle = orientation*PI/2;
    var s_orientation = orientation+2;
    s_orientation = s_orientation>3?s_orientation-4:s_orientation;
    var s_angle = s_orientation*PI/2;
    push();
    noStroke();
    fill(random(colors));
    translate(y,x);
    translate(size/2, size/2);
    rotate(angle);
    translate(-size/2, -size/2);
    triangle(size, 0 , size, size, 0, size);
    pop();

    console.log(Math.random())
    if(Math.random() > density*x/10){
        push()
        noStroke();
        fill(random(colors));
        translate(y,x);
        translate(size/2, size/2);
        rotate(s_angle);
        translate(-size/2, -size/2);
        triangle(size, 0 , size, size, 0, size);
        pop()
    }
}