var fibo;
var canvas;
function setup() {
    fibo = createSeries(700);
    canvas = createCanvas(1000, 900);
    canvas.position(345,55);
    noLoop();
    
  }
  
  function draw() {
    background('black');
    noFill();
    stroke('white');
    strokeWeight(1.5);
    translate(width/2, height/2);
    // Original values from Shiffmann's blog - Did not produce cool results with my code. 
    // Better looking values below. 
    // WARNING: Convert to radians.
    // var angleChange = 137.5;
    // var increment = 200;

    // Good ones
    // var angleChange = 0.0174533;/*Interesting. 1 deg*/
    // var increment = 200;

    // var angleChange = Math.PI/25;/*Basic. Ok-ish. Use this with createSeries(400)*/
    // var increment = width;

    // var angleChange = (Math.PI)+10;/*Ok-ish Awesome. Use this with createSeries(500) or createSeries(150)*/
    // var increment = width/4;

    // var angleChange = Math.PI/4;/*Ok-ish Awesome. Use this with createSeries(500)*/
    // var increment = width/4;

    // var angleChange = Math.PI/9;/*Cool! Use this with createSeries(500)*/
    // var increment = width/4;

    // var angleChange = Math.PI + Math.PI/1000;/*Interesting. 180.018 deg*/
    // var increment = width/4;

    // var angleChange = Math.PI + Math.PI/444;/*Interesting. 180.32 deg*/
    // var increment = width/4;

    // var angleChange = Math.PI/4;/*Cool. 45 deg*. Try with createSeries(1000)*/
    // var increment = 200;

    // var angleChange = 7.67945;/*Interesting. 440 deg*/
    // var increment = 100;

    var angleChange = 0.418879;/*AMAZING!!!!!!. 24 deg*/
    var increment = 100;


    var angle = 0;
    var count = 0;
    fibo.forEach((f,ind) => {
        var r = Math.sqrt(count)
        //r = count;
        var x = r * sin(angle);
        var y = r * cos(angle);
        
        angle += angleChange;
        count += increment;
        ellipse(x, y, Math.log(f));
    });
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