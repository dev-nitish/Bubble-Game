let bubbles = [];
let count = 0;

function setup() {

	createCanvas(1280, 720);

	// for(let i = 0; i < 5; i++){

	// 	let x = random(width);
	// 	let y = height;
	// 	let z = random(20, 60);
	// 	let b = new Bubble(x, y, z);
	// 	bubbles.push(b);
	// }
	// bubbles[0] = new Bubble(300, 300, 25);
	
}


function draw(status) {

	background(0);

	//Generating bubbles @ 10 bubbles each time on screen rad=radius
	//corX=co-ordinate x, corY=co-ordinate y, speed=speed of movement 

	if(bubbles.length < 10){
		let rad = random(20, 60);
		let corX = random(rad, width-rad);
		let corY = height;
		let speed = random(-6, -2);
		let b = new Bubble(corX, corY, rad, speed);
		bubbles.push(b);
	}

	//Changing bubble color if pointer is within bubble's body

	for(let i = 0; i < bubbles.length; i++){
		if(bubbles[i].inside(mouseX, mouseY)){
			bubbles[i].changeColor(255);
		}
		else {
			bubbles[i].changeColor(0);
		}

		bubbles[i].move();
		bubbles[i].show();
	}	

	//Counting brusted bubbles after colliding with top edge of canvas

	for(let i = bubbles.length-1; i >= 0; i--) {
		if(bubbles[i].popped()){
			count++;
			bubbles.splice(i, 1);
		}
	}

	//Game over when total self popped bubbles is greater than 50

	if (count >= 50){
		alert("GAME OVER");
		alert("Click here for new game")
		count = 0;
		bubbles = [];
		setup();
		draw();
	}

	// console.log(count);
}

//function to brust bubbles on click

function mouseDragged() {

	for(let i = bubbles.length-1; i >= 0; i--) {
		if(bubbles[i].inside(mouseX, mouseY)){
			bubbles.splice(i, 1);
		}
	}
}

//Bubble class:

class Bubble {
	constructor(x, y, r, speed) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.shade = 0;
		this.speed = speed;
	}

	changeColor(code) {
		this.shade = code;
	}

	move() {
		
		//this.x = this.x + random(-2, 2);
		this.y = this.y + this.speed;
	}

	show() {
		stroke(255);
		strokeWeight(3);
		// noStroke();
		// fill(255, 3);
		fill(this.shade, 125);
		ellipse(this.x, this.y, this.r*2);

	}

	inside(px, py) {
		let d = dist(this.x, this.y, px, py);
		if(d < this.r){
			return true;
		}
		else
		{
			return false;
		}
	}

	popped() {
		if (this.y < this.r){
			return true;
		}
		else {
			return false;
		}

		// var popped = (this.y < this.r) ? "true" : "false";
		// return popped;
	}

}