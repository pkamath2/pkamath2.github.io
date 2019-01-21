let height = 1000;
let width = 700;
let size = 10;
let count = 1000;
let colors = ['#ffd1d8', '#b4ecb4', "#80f4ff"]
let sel_color = '#ffd1d8';
let sel_bg_color = '#80f4ff';
let prev_orientation = -10;
let tiles;

function setup(){
    canvas = createCanvas(width,height);
    canvas.position(475,55);
    noLoop();
    selectedColor = random(colors);
    tiles = new Array();
}


function draw(){
    for(var i=0;i<width/size; i++){
        tiles[i] = new Array();
       for(var j=0;j<height/size; j++){
           tiles[i][j]= {
                            x:i*size,
                            y:j*size,
                            orientation: random([0,1]),
                            sel_color: '#ffd1d8',
                            sel_bg_color: '#80f4ff',
                            swap: false
                        }
       }
    }
    i=0; j=0;
    for(i=0;i<width/size;i++){
        for(j=0;j<height/size;j++){
            if(i>0 && j==0){
                if(tiles[i-1][0].orientation == tiles[i][0].orientation){
                    tiles[i][0].swap = !tiles[i-1][0].swap;
                }else{
                    tiles[i][0].swap = tiles[i-1][0].swap;
                }
                    
            }

            if(j>0){
                if(tiles[i][j-1].orientation == tiles[i][j].orientation){
                    tiles[i][j].swap = !tiles[i][j-1].swap;
                }else{
                    tiles[i][j].swap = tiles[i][j-1].swap;
                }
            }
        }
    }

    for(i=0;i<width/size;i++){
        for(j=0;j<height/size;j++){
            tile(tiles[i][j]);
        }
    }
        
}

function tile(t){
    if(t.swap){
        var tmp = t.sel_color;
        t.sel_color = t.sel_bg_color;
        t.sel_bg_color = tmp;
    }
    
    push();
    translate(t.x, t.y);
    noStroke();
    fill(t.sel_bg_color)
    rect(0, 0, size, size);
    translate(size/2, size/2);
    rotate(t.orientation * PI/2);
    translate(-size/2, -size/2);
    stroke('black');
    fill(t.sel_color);
    arc(0, 0, size, size, 0, PI/2);
    arc(size, size, size, size, PI, 3*PI/2);
    pop();
}