var fibo;
var canvas;
var index = 0;
var angle = 0;
var count = 0;

var angleChange =  0.418879
var increment = 200;

function draw() {
  fibo = createSeries(150);

  var svg = d3.select("#fibo");
  svg.attr("transform", "translate(400, 0)")
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  var g = svg.append("g");
  g.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  g.selectAll("circle").data(fibo).enter().append("circle")
    .attr("cx", (d, i) => {
      return Math.sqrt(increment * i) * Math.sin(angleChange * i)
    })
    .attr("cy", (d, i) => {
      return Math.sqrt(increment * i) * Math.cos(angleChange * i)
    })
    .attr("r", (d, i) => { if (d == 0) return 0; else return Math.log(d) })
    .attr("stroke-width", "2")
    .attr("fill", "None")
    .attr("stroke", "pink");
}

draw();

function createSeries(limit) {
  var series = [];
  var first = 0;
  var middle = first + 1;
  series.push(first);
  series.push(middle);

  var end;
  for (i = 0; i < limit; i++) {
    end = middle + first;
    series.push(end);
    first = middle;
    middle = end;
  }
  return series;
}