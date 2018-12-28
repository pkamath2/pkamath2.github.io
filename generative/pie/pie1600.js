var pie = [];
var canvas;
var arcs = [];
var startAngles = [];
var endAngles = [];
var midAngle1 = [];
var midAngle2 = [];
var index = 0;
var increment = 2 * Math.PI/10;

var circleRadius = 500;

function preload(){
    httpGet('/generative/data/pie1600.csv', 'text', false, function(r){
        pie = r.split(',');
    });
}

function setup() {
    canvas = createCanvas(600, 600);   
    canvas.position(550,70);
    background('#fffaf0');
    frameRate(150);
    curveTightness(-5);
}
  
function draw() {
    translate(width/2, height/2);
    if(index == 0){
       stroke("#B22222"); 
       strokeWeight(7);
       noFill()

       var start = 0;
       
       for(i=0;i<10;i++){
            var end = start+increment - PI/50;
            var a = arc(0,0, circleRadius, circleRadius, start, end, OPEN);
            
            arcs.push(a);
            var s = start +  PI/50
            startAngles.push(start + 1 * (increment - 2*PI/50)/4);
            midAngle1.push(start + 2 * (increment - 2*PI/50)/4);
            midAngle2.push(start + 3 * (increment - 2*PI/50)/4);
            endAngles.push(start + 4 * (increment - 2*PI/50)/4);
            start = start+increment;
       }
    }
    stroke("black"); 
    strokeWeight(0.9);
    //curveTightness(-3);
    
    var sAngle = startAngles[pie[index]];
    var eAngle = startAngles[pie[index+1]];

    var inc = pie.length/4;
    console.log(index)
    if(index <inc){
        sAngle = startAngles[pie[index]];
        eAngle = startAngles[pie[index+1]];
    }else if(index>=inc && index<2*inc){
        sAngle = midAngle1[pie[index]];
        eAngle = midAngle1[pie[index+1]];
    }else if(index>=2*inc && index<3*inc){
        sAngle = midAngle2[pie[index]];
        eAngle = midAngle2[pie[index+1]];
    }else{
        sAngle = endAngles[pie[index]];
        eAngle = endAngles[pie[index+1]];
    }

    
    // curve(2*circleRadius*cos(sAngle), 
    //         2*circleRadius*sin(sAngle), 
    //         0.5*circleRadius*cos(sAngle), 
    //         0.5*circleRadius*sin(sAngle), 
    //         0.5*circleRadius*cos(eAngle), 
    //         0.5*circleRadius*sin(eAngle),
    //         2*circleRadius*cos(eAngle), 
    //         2*circleRadius*sin(eAngle));

    if(index < 1600){
    beginShape();
    curveVertex(0.5*circleRadius*cos(sAngle), 0.5*circleRadius*sin(sAngle));
    curveVertex(0.5*circleRadius*cos(sAngle), 0.5*circleRadius*sin(sAngle));
    curveVertex(0.15*circleRadius*cos(sAngle), 0.15*circleRadius*sin(sAngle));
    curveVertex(0.25*circleRadius*cos(sAngle), 0.25*circleRadius*sin(sAngle));
    curveVertex(0.25*circleRadius*cos(eAngle), 0.25*circleRadius*sin(eAngle));
    curveVertex(0.15*circleRadius*cos(eAngle), 0.15*circleRadius*sin(eAngle));
    curveVertex(0.5*circleRadius*cos(eAngle), 0.5*circleRadius*sin(eAngle));
    curveVertex(0.5*circleRadius*cos(eAngle), 0.5*circleRadius*sin(eAngle));
    endShape();
    }
    index++
    if(index == pie.length){
        noLoop();
    }
}