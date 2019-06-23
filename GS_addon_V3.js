
//********************************************************* */
function calculateFitness() {
  var bestCurrentDistance = Infinity;
  for (var i = 0; i < shuffledOrder.length; i++) {
    var d = calcDistance(cities, shuffledOrder[i]);

    if (d < bestEverDistance) { //if distance < recordDistance 
      bestEverDistance = d;
      bestEverOrder = shuffledOrder[i];
      console.log("bestEverDistance = ", bestEverDistance);
    }
    //Find the currentBest everytime this function is called.
    if (d < bestCurrentDistance) {
      bestCurrentDistance = d;
      bestCurrentOrder = shuffledOrder[i];
      // currentBest is used to draw Cities with currentBest path

    }
    fitness[i] = 1 / (pow(d, 8) + 1);
  }
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

//******************************************************************
function nextGeneration() {
  var newShuffledOrder = [];
  for (var i = 0; i < shuffledOrder.length; i++) {
    var orderA = pickOne(shuffledOrder, fitness);
    var orderB = pickOne(shuffledOrder, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, mr);
    newShuffledOrder[i] = order;
  }
  shuffledOrder = newShuffledOrder;
}

//******************************************************************
function pickOne(list, prob) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

//******************************************************************
function crossOver(orderA, orderB) {
  var start = floor(random(orderA.length));
  var end = floor(random(start + 1, orderA.length));
  var neworder = orderA.slice(start, end);
  // var left = totalCities - neworder.length;
  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}

//******************************************************************
function mutate(order, mutationRate) {
  for (var i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      var indexA = floor(random(order.length));
      var indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}

//********************************************************* */
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//******************************************************************
function createPath(cityArray) {
  var rec1 = Infinity;
  sum = 0;
  for (var k = 0; k < totalCities; k++) {
    unreached = cityArray.slice(); //copy of cityArray
    reached.splice(0, reached.length); //clear reached array
    cityPath.splice(0, cityPath.length); //clear citypath array;
    reached.push(unreached[k]);
    cityPath[0] = unreached[k].z;
    unreached.splice(k, 1);

    while (unreached.length > 0) {
      var rec2 = Infinity;
      var rIndex;
      var uIndex;

      for (var i = reached.length - 1; i < reached.length; i++) {
        for (var j = 0; j < unreached.length; j++) {
          var v1 = reached[i];
          var v2 = unreached[j];
          var d = dist(v1.x, v1.y, v2.x, v2.y);
          if (d < rec2) {
            rec2 = d;
            rIndex = i;
            uIndex = j;
          }
        }
      }
      reached.push(unreached[uIndex]);
      cityPath.push(unreached[uIndex].z);
      unreached.splice(uIndex, 1);
    }

    var sum = calcDistance(cityArray, cityPath);

    if (sum < rec1) {
      rec1 = sum;
      bestPath = cityPath.slice();
      bestEverDistance = rec1;
      bestEverOrder = bestPath;
    }
  }
  console.log("Best Inital Path distance = ", bestEverDistance);
//  var copyBestPath = bestPath.slice(0);
//  console.log("Unaltered Copy of BestPath = ", copyBestPath);
//  var partialArray = copyBestPath.splice(2,5);
//  console.log("Spliced Copy of BestPath = ", copyBestPath);
//  console.log("PartialArray = ", partialArray);

}

//**************************************************** */
function calcDistance(cityArr, order) {
  var sum2 = 0;
  var bestDistance = Infinity;

  for (var i = 0; i < order.length; i++) {
    var cityAIndex = order[i];
    var cityA = cityArr[cityAIndex];

    if (i == cityArr.length - 1) {
      var cityBIndex = order[0]; //Completes the path
    } else {
      var cityBIndex = order[i + 1];
    }
    var cityB = cityArr[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum2 += d;
  }

  return sum2;
}