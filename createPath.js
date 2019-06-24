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
      shuffledOrder[0]= cityPath.slice();
    }
  }
  console.log("Best Inital Path distance = ", bestEverDistance);
//  var copyBestPath = bestPath.slice(0);
//  console.log("Unaltered Copy of BestPath = ", copyBestPath);
//  var partialArray = copyBestPath.splice(2,5);
//  console.log("Spliced Copy of BestPath = ", copyBestPath);
//  console.log("PartialArray = ", partialArray);

}