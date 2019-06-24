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