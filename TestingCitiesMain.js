var cities = [];
var citiesIndex = [];
var cityPath = [];
var bestPath = [];
//Set totalCities to population size of the Test.csv file
var totalCities = 130;
var tweak = 1; //Used to adjust city points on screen 
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
function preload() {
  table = loadTable('ch130.csv', 'csv','header');
}
//****************************************************************** */
function setup() {
  createCanvas(1000, 1000);
  
  //mr = .01; //Mutation rate (between .01 and .0000001)

  // for (var i = 0; i < totalCities; i++) {
  //   var v = createVector(random(width), random(height), i);
  //   cities[i] = v; //Array of city vectors
  //   citiesIndex[i] = i; // Index order of city vectors     
  // }
  
  for (let r = 0; r < table.getRowCount(); r++){
   
    citiesIndex[r] = r;
     
    
      var v = createVector(table.get(r, 'x')*tweak, table.get(r, 'y')*tweak,r);
      cities[r] = v; //Initial random placement array of total 
    
  }
  
  
  //Set inital i to 1 so that I can push bestPath to index 0
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
  mr = document.getElementById("myNumber").value;
  // Draw 4 quadrants on screen -------------------------------
  // stroke(155);
  // line(0, (height / 2), width, (height / 2));
  // stroke(155);
  // line(width / 2, 0, width / 2, height);

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
  textAlign(CENTER, TOP);
  for (var i = 0; i < cities.length; i++) {
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(cities[i].x, cities[i].y, 4, 4);
    // strokeWeight(2);
    // stroke(0, 0, 255);
    // textSize(25);
    // text(i+1, cities[i].x, cities[i].y);
  }

}