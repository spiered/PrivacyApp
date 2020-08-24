function generateGradings() {
  var gradings = {};
  var elements = document.getElementById("services").elements;
  for (var i = 0; i < elements.length; i++) {
    element = elements[i];
    if (element.checked == true) {
      console.log(element.value);
      var service = element.value;
      var url = `https://tosdr.org/api/1/service/${element.value}.json`;//typescript bro
      console.log(url);
      $.getJSON(url).done(function(data) {
        for (var i of Object.keys(data.pointsData)) {
          switch (data.pointsData[i].tosdr.point) {
            case "blocker":
              gradings[i] = -20;
              break;
            case "bad":
              gradings[i] = -10;
              break;
            case "neutral":
              gradings[i] = 0;
              break;
            case "good":
              gradings[i] = 10;
              break;
            default:
              break;
          }
        }
        console.log(gradings);
        getScore(gradings, service);
        gradings = {};
      });
    }
  }
}

/*var gradings = {
  642: -10,
  689: -10,
  713: -10,
  719: 10,
  741: -10,
  755: 10,
  771: 0,
  817: 10,
  852: -10,
  854: 10,
  855: -10,
  877: -10,
  905: 0,
  926: 10,
  1012: -10,
  1082: 0,
  1092: -10,
  1143: -10,
  7822: 0
};
*/
function getScore(gradings, service) {
  var finalGrade = 10;
  const values = Object.values(gradings);
  for (var i = 0; i < Object.keys(gradings).length; i++) {
    finalGrade += values[i];
  }
  console.log(finalGrade);
  document.getElementById(
    "standard"
  ).innerHTML += `Your privacy score for ${service}: ${finalGrade}\n`;
  finalGrade = 0;
}

function clearStuff() {
  document.getElementById("standard").innerHTML = "";
}
