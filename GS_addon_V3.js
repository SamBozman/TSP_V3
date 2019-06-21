
function createPath() {

  unreached = cities.slice(); //copy of cities
  reached.push(unreached[0]);
  cityPath[0] = unreached[0].z;
  unreached.splice(0, 1);

  while (unreached.length > 0) {
    var record = Infinity;
    var rIndex;
    var uIndex;

    for (var i = reached.length - 1; i < reached.length; i++) {
      for (var j = 0; j < unreached.length; j++) {
        var v1 = reached[i];
        var v2 = unreached[j];
        var d = dist(v1.x, v1.y, v2.x, v2.y);
        if (d < record) {
          record = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }
    reached.push(unreached[uIndex]);
    cityPath.push(unreached[uIndex].z);
    unreached.splice(uIndex, 1);
  }
  var sum = calcDistance(cities, cityPath);
  console.log("Distance = ", sum);
}

//**************************************************** */
function calcDistance(cityArr, order) {
  var sum = 0;
  for (var i = 0; i < order.length; i++) {
    var cityAIndex = order[i];
    var cityA = cityArr[cityAIndex]; 

    if (i == cityArr.length - 1) {
      var cityBIndex = order[0];//Completes the path
    } else {
      var cityBIndex = order[i + 1];
    }
    var cityB = cityArr[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}