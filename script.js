let services_selected = []

// function select(id) {
//     let element = document.getElementById(id);
//     element.parentNode.classList.toggle("selected");
//     element.parentNode.classList.toggle("hover-effect");
//     if (services_selected.includes(id)) {
//         for (let i = 0; i < services_selected.length; i++) {
//             if (services_selected[i] === id) {
//                 services_selected.splice(i, 1);
//             }
//         }
//     } else {
//         services_selected.push(id)
//     }
// }

function select_div(classe) {
    let className = classe.split(' ')[0];
    console.log(document.getElementsByClassName(classe).length)
    if (services_selected.includes(className)) {
        for (let i = 0; i < services_selected.length; i++) {
            if (services_selected[i] === className) {
                services_selected.splice(i, 1);
            }
        }
    } else {
        services_selected.push(className)
    }
    document.getElementById("number_of_services").innerText = services_selected.length;

    let element_service;
    let element_add;
    let div_element;
    document.getElementById("services_selected").innerHTML = ""
    for (let i = 0; i < services_selected.length; i++) {
        element_service = document.getElementById(services_selected[i]).innerHTML;
        element_service.id == services_selected[i] + "2"
        console.log(element_service)
        div_element = document.createElement("div");

        element_add = `<div onclick="deselect(this.className)" class="${services_selected[i]} svg-div selected"><svg class="" id="${services_selected[i]}" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${element_service}</svg></div>`
        div_element.innerHTML += element_add;
        document.getElementById("services_selected").appendChild(div_element);
        console.log(services_selected.length)
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
    let className = classe.split(' ')[0];
    if (services_selected.includes(className)) {
        for (let i = 0; i < services_selected.length; i++) {
            if (services_selected[i] === className) {
                services_selected.splice(i, 1);
            }
        }
        let element_service;
        let element_add;
        let div_element;
        document.getElementById("services_selected").innerHTML = ""
        for (let i = 0; i < services_selected.length; i++) {
            element_service = document.getElementById(services_selected[i]).innerHTML;
            element_service.id == services_selected[i] + "2"
            console.log(element_service)
            div_element = document.createElement("div");

            element_add = `<div onclick="deselect(this.className)" class="${services_selected[i]} svg-div selected"><svg class="" id="${services_selected[i]}" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${element_service}</svg></div>`
            div_element.innerHTML += element_add;
            document.getElementById("services_selected").appendChild(div_element);
            console.log(services_selected.length)
        }
        element = document.getElementsByClassName(classe)[0];
        element.classList.toggle("selected");
        element.classList.toggle("hover-effect");
        document.getElementById("number_of_services").innerText = services_selected.length;
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
]

let good_research;

function search(text) {
    console.log(text);
    good_research = [];
    let good;
    for (let i = 0; i < online_services.length; i++) {
        for (let e = 0; e < text.length; e++) {
            if (online_services[i][e] == text[e]) {
                if (e == (text.length - 1)) {
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


function generateGradings() {
    document.getElementById("response").innerHTML = "";
    var gradings = {};
    var elements = services_selected;
    var sites = [];
    if (services_selected == 0) {
        document.getElementById("response").style.padding = 0;
    } else {
        document.getElementById("response").style.padding = "20px";
    }
    for (let i = 0; i < elements.length; i++) {
        element = elements[i];
        var service = element;
        sites.push(service);
        var url = `https://tosdr.org/api/1/service/${service}.json`;
        $.getJSON(url, function(data) {
            for (let s of Object.keys(data.pointsData)) {
                switch (data.pointsData[s].tosdr.point) {
                    case "blocker":
                        gradings[s] = -20;
                        break;
                    case "bad":
                        gradings[s] = -10;
                        break;
                    case "neutral":
                        gradings[s] = 0;
                        break;
                    case "good":
                        gradings[s] = 10;
                        break;
                    default:
                        break;
                }
            }
            console.log(sites[i])
            getScore(gradings, sites[i], data);
            gradings = {};
        });
    }
}

function getScore(gradings, service, data) {
    console.log(service);
    var finalGrade = 10;
    const values = Object.values(gradings);
    for (let i = 0; i < Object.keys(gradings).length; i++) {
        finalGrade += values[i];
    }
    var para = document.createElement("p");
    var node = document.createTextNode(`Your privacy score for ${service}: ${finalGrade}\n`);
    para.appendChild(node);

    var parentElement = document.getElementById("response");
    parentElement.appendChild(para);
    console.log(services_selected)
    finalGrade = 0;
}

function clearStuff() {
    document.getElementById("response").innerHTML = "";
}