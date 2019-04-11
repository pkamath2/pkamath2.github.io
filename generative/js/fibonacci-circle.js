var fibo;
var canvas;
var index = 0;
var angle = 0;
var count = 0;

var angleChange = 0;
var increment = 0;

function initialize(){
  clear();
  index = 0;
  angle = 0;
  count = 0;
  background('#191314');
  // background('floralwhite');
}

function setup() {
    fibo = createSeries(600);
    canvas = createCanvas(1000, 900);
    canvas.position(345,55);
    initialize();
    frameRate(2000);

    // Original values from Shiffmann's blog - Did not produce cool results with my code. 
    // Better looking values below. 
    // WARNING: Convert to radians.
    // angleChange = 137.5;
    // increment = 200;

    // Good ones
    // angleChange = 0.0174533;/*Interesting. 1 deg*/
    // increment = 200;

    // angleChange = Math.PI/25;/*Basic. Ok-ish. Use this with createSeries(100)*/
    // increment = width;

    // angleChange = (Math.PI)+10;/*Ok-ish Awesome. Use this with createSeries(500) or createSeries(150)*/
    // increment = width/4;

    // angleChange = Math.PI/4;/*Ok-ish Awesome. Use this with createSeries(500)*/
    // increment = width/4;

    // angleChange = Math.PI/9;/*Cool! Use this with createSeries(500)*/
    // increment = width/4;

    // angleChange = Math.PI + Math.PI/1000;/*Interesting. 180.018 deg*/
    // increment = width/4;

    // angleChange = Math.PI + Math.PI/444;/*Interesting. 180.32 deg*/
    // increment = width/4;

    // angleChange = Math.PI/4;/*Cool. 45 deg*. Try with createSeries(1000)*/
    // increment = 200;

    // angleChange = 7.67945;/*Interesting. 440 deg*/
    // increment = 100;

    angleChange = 0.418879;/*AMAZING!!!!!!. 24 deg. Use createSeries(600)*/
    increment = 100;
  }
  
  function draw() {
    
    noFill();
    // stroke('#7a3f72');
    stroke('pink');
    strokeWeight(2);
    translate(width/2, height/2);
    
    var r = Math.sqrt(count)
    var x = r * sin(angle);
    var y = r * cos(angle);
    
    angle += angleChange;
    count += increment;
    ellipse(x, y, Math.log(fibo[index]));

    index++;
    if(index == fibo.length){
        window.setTimeout(()=>initialize(), 3000);
    }
  }

  function createSeries(limit){
    var series = [];
    var first = 0;
    var middle = first + 1;
    series.push(first);
    series.push(middle);
    
    var end;
    for(i=0;i<limit;i++){
        end = middle + first;
        series.push(end);
        first = middle;
        middle = end;
    }
    return series;
  }