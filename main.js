function alertCheckbox() {
  var elements = document.getElementById("services").elements;
  for (var i = 0; i < elements.length; i++) {
    element = elements[i];
    if (element.checked == true) {
      console.log(element.value);
      var url = `https://tosdr.org/api/1/service/${element.value}.json`;
      console.log(url);
      $.getJSON(url).done((data) => console.log(JSON.stringify(data)));
    }
  }
}
