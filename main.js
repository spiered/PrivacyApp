$.getJSON("https://tosdr.org/api/1/service/facebook.json").done(
                (data) => document.getElementById("##").innerHTML = JSON.stringify(data)
                );
            function alertCheckbox() {
                var elements = document.getElementById("services").elements;
                for (var i = 0; i < elements.length; i++){
                    element = elements[i];
                    if (element.checked == true) {
                        console.log(`${element.value} is checked`)
                    } else {
                        console.log(`${element.value} is not checked`)
                    }
                }
            }