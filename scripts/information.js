function main() {
    loadJSON((response) => injectDataInDocument(response))
}


function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './data/profile.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function injectDataInDocument(data) {
    injectProfile();
    injectTechnologies();
    injectProjects();
    injectContact();

    function injectProfile() {
        document.getElementById('picture').src = data.user.picture;
        document.getElementById('name').innerHTML = data.user.name;
        document.getElementById('description').innerHTML = data.user.description;
        document.getElementById('location').innerHTML = data.user.location;
        data.user.links.forEach((link) => {
            document.getElementById('links').innerHTML +=
                "<a href=\"" + link.href + "\" target=\"_blank\" class=\"profile-link\">" +
                    "<img src=\"" + link.img + "\" alt=\"" + link.title + "\">" +
                "</a>"
        })
    }

    function injectTechnologies() {

    }

    function injectProjects() {
        let slider = document.getElementById("projects").getElementsByClassName("slider")[0];
        
        for (let i = 0; i < 7; i++) {
            project = data.projects[i]
            slider.innerHTML +=
                "<div class=\"slide\">" + 
                    "<img src=\"" + project.image + "\" alt=\"\" id=\"project-image\">" +
                    "<h1 id=\"project-title\">" + project.title + "</h1>" +
                    "<div class=\"project-languages\"></div>" +
                    "<p id=\"project-description\">" + project.description + "</p>"
                "</div>"

            slide = slider.getElementsByClassName("slide")[i];
            project_languages = slide.getElementsByClassName("project-languages")[0];
            
            project.languages.forEach((language) => {
                project_languages.innerHTML +=
                    "<img src=\"" + language.image + "\" alt=\"language.title\">";
            })
        }

        slider.getElementsByClassName("slide")[0].className += " is-active";
    }

    function injectContact() {
        document.getElementsByName("contact-form")[0].setAttribute("action", "https://formspree.io/" + data.user.email);
    }
}

main();