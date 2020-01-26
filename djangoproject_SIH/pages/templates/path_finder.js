function removeFromArray(arr,elt){
	for(var i = arr.length-1;i>=0;i--){
		if (arr[i]==elt){
			arr.splice(i,1);
		}
	}
}

function heuristic(a,b){
	//var d = sqrt((abs(a.i-b.i)*abs(a.i-b.i))+(abs(a.j-b.j)*abs(a.j-b.j)));
	var d = dist(a.i,a.j,b.i,b.j);
	return d;
}

var cols = 100;
var rows = 100;
var grid = new Array(cols);

var openSet = [];
var closeSet = [];
var start;
var end;
var w, h;
var path = [];

//The main idea is to have the same value for the red green and blue component of the color. For this you need to calculate the lightness of every pixel. There are several ways to calculate the lightness. This is one of them.

window.onload = function() {

    console.log("hello");
    let canvas = document.getElementById("myCanvas");

    let ctx = canvas.getContext("2d");
    canvas.width=100;
    canvas.height=100;

    const fs = require('fs');

    fs.readFile('static/images/pattern_BM.patt', (err, data) => {
	if (err) throw err;

	let pixels = data.toString();
	console.log(pixels);
    });

    console.log(srcImg)
    console.log(imgData)
    console.log(pixels)
}

function Spot(i,j){
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbours = [];
	this.previous = undefined;
	this.wall = false;

    // console.log(pixels[(this.i*4-1)+(100*this.j*4-1)]);
	if(pixels[(this.i*4-1)+(100*this.j*4-1)]!=255){

		this.wall = true;
	}

	this.show = function( col ){
		fill(col);
		if(this.wall){
			fill(0);
			noStroke();
		rect(this.i*w,this.j*h,w,h);
		}

	}

	this.addNeighbours = function(grid){
		var i = this.i;
		var j = this.j;
		if(i<cols-1){
			this.neighbours.push(grid[i+1][j]);
		}
		if(i>0){
			this.neighbours.push(grid[i-1][j]);
		}
		if(j<rows-1){
			this.neighbours.push(grid[i][j+1]);
		}
		if(j>0){
			this.neighbours.push(grid[i][j-1]);
		}
		if(i > 0 && j > 0){
			this.neighbours.push(grid[i-1][j-1]);
		}	
		if(i < cols -1  && j > 0){
			this.neighbours.push(grid[i+1][j-1]);
		}	
		if(i > 0  && j < rows -1 ){
			this.neighbours.push(grid[i-1][j+1]);
		}		
		if(i <cols -1  && j <rows -1 ){
			this.neighbours.push(grid[i+1][j+1]);
		}		
		
	}
}

function setup(sti,stj,eni,enj){
	var sti = int(document.forms['form1']['starti'].value)
	var stj = int(document.forms['form1']['startj'].value)
	var eni = int(document.forms['form1']['endi'].value)
	var enj = int(document.forms['form1']['endj'].value)
	Spot(sti,stj)
	console.log(sti)
	console.log(stj)
	console.log(eni)
	console.log(enj)
	createCanvas(100,100);
	w = width /cols;
	h = height/ rows;
	//Making a 2d array
	for (var i = 0 ; i < cols ; i++){
		grid[i] = new Array(rows);
	}

	for(var i = 0 ; i< cols ; i++){
		for(var j = 0 ; j <rows ; j++){
			grid[i][j] = new Spot(i,j);
		}
	}


	for(var i = 0 ; i< cols ; i++){
		for(var j = 0 ; j <rows ; j++){
			grid[i][j].addNeighbours(grid);
		}
	}

	start = grid[sti][stj];
	end = grid[eni][enj];
	start.wall = false;
	end.wall = false;
	openSet.push(start);
	// console.log(grid);
	draw();


}

function draw(){	
		console.log('draw is executed')
		if (openSet.length>0){
			var winner = 0;
			for (var i = 0; i<openSet.length;i++){
				if(openSet[i].f<openSet[winner].f){
					winner = i;
				}
			}

			var current = openSet[winner];



			if (current==end){

					
				noLoop();
				console.log('Done!');
			}

			removeFromArray(openSet,current);

			closeSet.push(current);

			var neighbours = current.neighbours;
			for(var i = 0 ; i< neighbours.length; i++){
				var neighbour = neighbours[i];

				if(!closeSet.includes(neighbour)&&!neighbour.wall){

					var tempG = current.g +1;

					var newPath = false;

					if (openSet.includes(neighbour)){
						if (tempG<neighbour){
							neighbour.g = tempG;
							newPath = true;
						}
					}
					else{
						neighbour.g = tempG;
						newPath = true;
						openSet.push(neighbour);
					}

					if(newPath){
					neighbour.h = heuristic(neighbour,end);
					neighbour.f = neighbour.g +neighbour.h;
					neighbour.previous = current;
					}
				}
			}
		//we can keep going
	}
	else{
		// no solution
		console.log('No solution ! ');
		noLoop();
		return;
	}
	background(255);

	for (var i = 0; i<cols; i++){
		for (var j = 0 ; j <rows; j++){
			grid[i][j].show(color(255));
		}
	}

	// for(var i = 0 ; i <closeSet.length ; i++){
	// 	closeSet[i].show(color(255,0,0));
	// }

	// for(var i = 0 ; i <openSet.length ; i++){
	// 	openSet[i].show(color(0,255,0));
	// }
		path = [];
			var temp = current;
			path.push(temp);

			while(temp.previous){
				path.push(temp.previous);
				temp = temp.previous;
			}
	
			
	for(var i = 0 ; i <path.length;i++){
		path[i].show(color(0,0,255));
	}

	noFill();
stroke(255,100,100);
strokeWeight(w/2);
beginShape();
	for(var i = 0 ; i <path.length;i++){
		vertex(path[i].i * w +w/2 , path[i].j * h+h/2);
	}

endShape();

} 
