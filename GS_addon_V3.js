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
 
    if(sum < rec1){
      rec1 = sum;
      bestPath = cityPath.slice();
    }
    console.log("rec1 = ", rec1);
  }
  
  console.log("Best Path = ", bestPath);
  console.log("Best Distance = ", rec1);
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