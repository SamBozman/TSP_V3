var cities = [];
var cityPath = [];
var totalCities = 100;
var reached = [];
var unreached = [];

//****************************************************************** */
function setup() {
  createCanvas(1000, 1000);
  // Create cities in random positions on the canvas
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height), i);
    cities[i] = v; //Initial random placement array of total cities.       
  }
  control();
}

//****************************************************************** */
function control(){
  createPath(cities);
}

//****************************************************************** */
function draw() {
  background(200);
  // Draw 4 quadrants on screen -------------------------------
  stroke(155);
  line(0, (height / 2), width, (height / 2));
  stroke(155);
  line(width / 2, 0, width / 2, height);

  // Draw city connecting lines -------------------------------
  stroke(35, 191, 3);
  strokeWeight(4);
  
  beginShape();
  for (var i = 0; i < totalCities; i++) {
    var p = cityPath[i];
    vertex(cities[p].x, cities[p].y);
  }
  //stroke(0);
  vertex(cities[cityPath[0]].x, cities[cityPath[0]].y);
  endShape();
 

  // Draw city circles and ID numbers -------------------------
  textSize(25);
  textAlign(CENTER, BOTTOM);
  for (var i = 0; i < cities.length; i++) {
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(cities[i].x, cities[i].y, 16, 16);
    strokeWeight(2);
    stroke(0, 0, 255);
    textSize(25);
    text(i, cities[i].x, cities[i].y);
  }

}
