function generateGradings() {
  var gradings = {};
  var elements = document.getElementById("services").elements;
  for (let i of elements) {
    if (i.checked == true) {
      console.log(i.value);
      let service = i.value;
      var url = `https://tosdr.org/api/1/service/${service}.json`; //typescript bro
      console.log(url);
      $.getJSON(url).done(function(data) {
        for (let x of Object.keys(data.pointsData)) {
          switch (data.pointsData[x].tosdr.point) {
            case "blocker":
              gradings[x] = -20;
              break;
            case "bad":
              gradings[x] = -10;
              break;
            case "neutral":
              gradings[x] = 0;
              break;
            case "good":
              gradings[x] = 10;
              break;
            default:
              break;
          }
        }
        console.log(gradings);
        console.log(service);
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
  for (let y = 0; y < Object.keys(gradings).length; y++) {
    finalGrade += values[y];
  }
  console.log(finalGrade);
  document.getElementById(
    "standard"
  ).innerHTML += `Your privacy score for ${service}: ${finalGrade}<br>`;
  finalGrade = 0;
}

function clearStuff() {
  document.getElementById("standard").innerHTML = "";
}
