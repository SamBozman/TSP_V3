var cities = [];
var citiesIndex = [];
var cityPath = [];
var bestPath = [];
var totalCities = 100;
var reached = [];
var unreached = [];
var dropdown;
var shuffledArrays = 5000; //holds shuffled copies of cities Index
var shuffledOrder = [];
var fitness = [];

var bestEverDistance = Infinity;
var bestEverOrder;
var bestCurrentOrder;
var mr; //mutation rate (normally .01)
var statusP;

//****************************************************************** */
function setup() {
  createCanvas(1000, 1000);
  mr = .0000001; //Mutation rate (between .01 and .0000001)

  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height), i);
    cities[i] = v; //Array of city vectors
    citiesIndex[i] = i; // Index order of city vectors     
  }
  
  //Set inital i to 1 so that I can push bestPath ot index 0
  for (var i = 1; i < shuffledArrays; i++) {
    //Create a popSize shuffled array of the order array.
    // (if there are 500 popSize then there will be 
    // 500 suffled copies of the order array)
    shuffledOrder[i] = shuffle(citiesIndex);
     
  }
  createPath(cities);  
}


//****************************************************************** */
function draw() {
  
  background(200);
  calcFitness();
  nextGeneration();
  
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
    var p = bestEverOrder[i];
    vertex(cities[p].x, cities[p].y);
  }
  //stroke(0);
  vertex(cities[bestEverOrder[0]].x, cities[bestEverOrder[0]].y);
  endShape();


  // Draw city circles and ID numbers -------------------------
  textSize(25);
  textAlign(CENTER, BOTTOM);
  for (var i = 0; i < cities.length; i++) {
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(cities[i].x, cities[i].y, 16, 16);
    // strokeWeight(2);
    // stroke(0, 0, 255);
    // textSize(25);
    // text(i, cities[i].x, cities[i].y);
  }

}