Pts.namespace(window); 

generate = () => {
    var num_squares = 500;
    $("#fib").html("");
    //1. Initialize first row
    cell_state = new Array(num_squares*num_squares).fill(false);

    //2. Get Fibo sequence and set cell state
    $.when($.get('data/fibonacci.txt')).done(
        function(data){
            data = data.split("\n");
            for(i=0;i<data.length;i++){
                arr = data[i].toString(2).split("");
                for(j=0;j<arr.length;j++){
                    cell_state[i*num_squares + j] = arr[j]=="1"?true:false;
                }
            }
            createSpace(cell_state,num_squares);
        }
    );
    
}

createSpace = (cell_state,num_squares) => {
    var space = new CanvasSpace("#fib").setup({retina: true,bgcolor: 'floralwhite',resize:false});
    var form = space.getForm();
    var cells = [];
    space.add({
        start: () => {
            cells = Create.gridPts(space.innerBound, num_squares, num_squares);
        },
        animate: (time, ftime) => {
            cells.forEach((c,i) => {
                form.strokeOnly("#123", 0.1).fill(cell_state[i]?"#4e5054":"#fff").square(c, 2); 
            });
        }
    });
    space.playOnce(0);
}