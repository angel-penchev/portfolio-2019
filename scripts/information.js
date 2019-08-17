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

    function injectProfile() {
        document.getElementById('picture').src = data.user.picture;
        document.getElementById('name').innerHTML = data.user.name;
        document.getElementById('description').innerHTML = data.user.description;
        document.getElementById('location').innerHTML = data.user.location;
        data.user.links.forEach((link) => {
            document.getElementById('links').innerHTML += "<a href=\"" + link.href + "\"><img src=\"" + link.img + "\" alt=\"" + link.title + "\"></a>"
        })
    }

    function injectTechnologies() {

    }

    function injectProjects() {
        data.projects.forEach((project) => {
            project_template = "<div class=\"slide is-active\"><img src=\"" + project.image + "\" alt=\"\" id=\"project-image\"><h1 id=\"project-title\">" + project.title + "</h1><p id=\"project-description\">" + project.description + "</p></div>"
            document.getElementById("projects").getElementsByClassName("slider")[0].innerHTML += project_template;
        })

    }
}

main();