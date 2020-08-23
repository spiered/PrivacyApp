function alertCheckbox() {
  var grading = {};
  var elements = document.getElementById("services").elements;
  for (var i = 0; i < elements.length; i++) {
    element = elements[i];
    if (element.checked == true) {
      console.log(element.value);
      var url = `https://tosdr.org/api/1/service/${element.value}.json`;
      console.log(url);
      $.getJSON(url).done(function(data) {
        var data = data;
        for (var i of Object.keys(data.pointsData)) {
          switch (data.pointsData[i].tosdr.point) {
            case "blocker":
              grading[i] = -20;
              break;
            case "bad":
              grading[i] = -10;
              break;
            case "neutral":
              grading[i] = 0;
              break;
            case "good":
              grading[i] = 10;
              break;
            default:
              break;
          }
        }
        console.log(grading);
      });
    }
  }
}

var grading = {
  622: "bad",
  645: "bad",
  701: "bad",
  706: "bad",
  793: "bad",
  829: "good",
  902: "good",
  1122: "bad",
  1370: "neutral",
  1582: "bad",
  1591: "good",
  5922: "bad",
  5923: "bad",
  5925: "neutral",
  5926: "bad",
  5927: "neutral",
  5928: "neutral",
  5929: "bad",
  5930: "bad"
};
