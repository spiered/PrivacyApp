let services_selected = [];
let count = 0;

function select_div(classe) {
    let className = classe.split(" ")[0];
    if (services_selected.includes(className)) {
        for (let i = 0; i < services_selected.length; i++) {
            if (services_selected[i] === className) {
                services_selected.splice(i, 1);
            }
        }
    } else {
        services_selected.push(className);
    }
    document.getElementById("number_of_services").innerText =
        services_selected.length;

    let element_service;
    let element_add;
    let div_element;
    document.getElementById("services_selected").innerHTML = "";
    for (let i = 0; i < services_selected.length; i++) {
        element_service = document.getElementById(services_selected[i]).innerHTML;
        element_service.id == services_selected[i] + "2";
        div_element = document.createElement("div");

        element_add = `<div onclick="deselect(this.className)" class="${services_selected[
      i
    ]} svg-div selected"><svg class="" id="${services_selected[
      i
    ]}" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${element_service}</svg></div>`;
        div_element.innerHTML += element_add;
        document.getElementById("services_selected").appendChild(div_element);
    }
    let element;
    if (document.getElementsByClassName(classe).length > 1) {
        element = document.getElementsByClassName(classe)[1];
    } else {
        element = document.getElementsByClassName(classe)[0];
    }
    element.classList.toggle("selected");
    element.classList.toggle("hover-effect");
}

function deselect(classe) {
    let className = classe.split(" ")[0];
    if (services_selected.includes(className)) {
        for (let i = 0; i < services_selected.length; i++) {
            if (services_selected[i] === className) {
                services_selected.splice(i, 1);
            }
        }
        let element_service;
        let element_add;
        let div_element;
        document.getElementById("services_selected").innerHTML = "";
        for (let i = 0; i < services_selected.length; i++) {
            element_service = document.getElementById(services_selected[i]).innerHTML;
            element_service.id == services_selected[i] + "2";
            div_element = document.createElement("div");

            element_add = `<div onclick="deselect(this.className)" class="${services_selected[
        i
      ]} svg-div selected"><svg class="" id="${services_selected[
        i
      ]}" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${element_service}</svg></div>`;
            div_element.innerHTML += element_add;
            document.getElementById("services_selected").appendChild(div_element);
        }
        element = document.getElementsByClassName(classe)[0];
        element.classList.toggle("selected");
        element.classList.toggle("hover-effect");
        document.getElementById("number_of_services").innerText =
            services_selected.length;
    }
}

const online_services = [
    "google",
    "discord",
    "apple",
    "facebook",
    "paypal",
    "lastpass",
    "evernote",
    "todoist",
    "skype",
    "google hangouts",
    "zoom",
    "teamviewer",
    "wikipedia",
    "coursera",
    "khanacademy",
    "academia",
    "deezer",
    "last.fm",
    "spotify",
    "soundcloud"
];

let good_research;

function search(text) {
    good_research = [];
    let good;
    for (let i = 0; i < online_services.length; i++) {
        for (let e = 0; e < text.length; e++) {
            if (online_services[i][e] == text[e]) {
                if (e == text.length - 1) {
                    good = true;
                } else {
                    continue;
                }
            } else {
                good = false;
                break;
            }
        }
        if (good) {
            good_research.push(online_services[i]);
        }
    }
    document.getElementById("findings").innerText = "";
    for (let a = 0; a < good_research.length; a++) {
        document.getElementById("findings").innerText += `${good_research[a]}_`;
    }
    document.getElementById("search-input").toggleAttribute("placeholder");
}

let all_grades = {};

function generateGradings() {
    for (let z = 0; z <= services_selected.length; z++) {
        if (services_selected[z] === "itunes") {
            let index = services_selected.indexOf("itunes");
            services_selected.splice(index, 1);
        }
    }
    var gradings = {};
    var elements = services_selected;
    var sites = [];
    for (let i = 0; i < elements.length; i++) {
        element = elements[i];
        var service = element;
        sites.push(service);
        var url = `https://tosdr.org/api/1/service/${service}.json`;
        $.getJSON(url, function(data) {
            for (let s of Object.keys(data.pointsData)) {
                switch (data.pointsData[s].tosdr.point) {
                    case "blocker":
                        gradings[s] = -10;
                        break;
                    case "bad":
                        gradings[s] = -5;
                        break;
                    case "neutral":
                        gradings[s] = 0;
                        break;
                    case "good":
                        gradings[s] = 5;
                        break;
                    default:
                        break;
                }
            }
            console.log(sites[i]);
            getScore(gradings, sites[i], data);
            gradings = {};
            getAverage(all_grades);
        });
    }
}

function getScore(gradings, service, data) {
    var finalGrade = 20;
    const values = Object.values(gradings);
    for (let i = 0; i < Object.keys(gradings).length; i++) {
        finalGrade += values[i];
    }
    all_grades[service] = finalGrade;
    finalGrade = 0;
    console.log(values.length);
    count += values.length;
}

function getAverage(obj) {
    var avg = 0;
    for (let a of Object.values(obj)) {
        avg += a;
    }
    avg = avg / Object.values(obj).length;
    console.log(avg);
    //if (avg > 60) {
    //    document.getElementById(
    //        "response"
    //    ).innerHTML = `Your Privacy Score™ : ${Math.round(
    //  avg
    //)}<br>This is a great score!`;
    //} else if (avg < 40) {
    //    document.getElementById(
    //        "response"
    //    ).innerHTML = `Your Privacy Score™ : ${Math.round(
    //  avg
    //)}<br>This is a concerning score...`;
    //} else {
    //    document.getElementById(
    //        "response"
    //    ).innerHTML = `Your Privacy Score™ : ${Math.round(
    //  avg
    //)}<br>This is an average score but you should still be careful!`;
    //}

    var data = [{
        y: Object.values(all_grades),
        x: Object.keys(all_grades),
        type: "bar"
    }];

    var layout = {
        title: {
            text: "Which service has the best privacy practices? (higher is better)",
        },
    };

    Plotly.newPlot("myDiv", data, layout);

}