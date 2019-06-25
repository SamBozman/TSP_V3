//********************************************************* */
function calcFitness() {
  var bestCurrentDistance = Infinity;
  for (var i = 0; i < shuffledOrder.length; i++) {
    var d = calcDistance(cities, shuffledOrder[i]);

    if (d < bestEverDistance) { //if distance < recordDistance 
      bestEverDistance = d;
      bestEverOrder = shuffledOrder[i];
      console.log("bestEverDistance = ", bestEverDistance);
      console.log("Mutation rate = ", mr);
    }
    //Find the currentBest everytime this function is called.
    if (d < bestCurrentDistance) {
      bestCurrentDistance = d;
      bestCurrentOrder = shuffledOrder[i];
      // currentBest is used to draw Cities with currentBest path

    }
    fitness[i] = 1 / (pow(d, 10) + 1);
  }
normalizeFitness();

}

//******************************************************************
function normalizeFitness() {
  var sum = 0;
  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }

}