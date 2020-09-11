let all_grades = {};

function generateGradings() {
  reset();
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
        getAverage(all_grades);
      });
    }
  }
}

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
  all_grades[service] = finalGrade;
  console.log(all_grades); 
  finalGrade = 0;
}

function reset() {
  document.getElementById("standard").innerHTML = "";
  document.getElementById("average").innerHTML = "";
}

function getAverage(obj) {
  var avg = 0;
  for (let a of Object.values(obj)) {
    avg += a;
  } 
  avg = avg / Object.values(obj).length;
  console.log(avg);
  document.getElementById("average").innerHTML = `Your Privacy Score™ : ${Math.round(avg)}`;
}
