
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