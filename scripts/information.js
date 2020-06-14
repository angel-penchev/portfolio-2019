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
        profile = document.getElementsByClassName("profile")[0];
        profile.getElementsByClassName("picture")[0].src = data.user.picture;
        profile.getElementsByClassName("name")[0].innerHTML = data.user.name;
        profile.getElementsByClassName("description")[0].innerHTML = data.user.description;
        profile.getElementsByClassName("location")[0].innerHTML = data.user.location;

        data.user.links.forEach((link) => {
            profile.getElementsByClassName("links")[0].innerHTML +=
                `<a href="${ link.href }" target="_blank" class="profile-link">
                    <img src="${ link.img }" alt="${link.title}">
                </a>`
        })
    }

    function injectTechnologies() {
        let slide = document.getElementsByClassName("technologies")[0].getElementsByClassName("content")[0];

        for (let i = 0; i < data.technologies.length; i++) {
            section = data.technologies[i];
            slide.innerHTML +=
                `<div class="subgroup"> 
                    <h2 class="title">${ section.title }</h2>
                    <div class="languages"></div>
                </div>`

            languages = slide.getElementsByClassName("subgroup")[i].getElementsByClassName("languages")[0];;
            section.languages.forEach((language) => {
                languages.innerHTML +=
                `<img src="${ language.img }" alt="${ language.title }">`
            })
        }
        
    }

    function injectProjects() {
        let slider = document.getElementsByClassName("projects")[0].getElementsByClassName("slider")[0];
        
        for (let i = 0; i < data.projects.length; i++) {
            project = data.projects[i]
            slider.innerHTML +=
                `<div class="project-slide">
                    <img src="${ project.image }" alt="${ project.title }" class="project-image">
                    <h1 class="project-title">${ project.title }</h1>
                    <div class="project-languages"></div>
                    <div class="project-description"><p>${ project.description }</p></div>
                </div>`

            project_languages = slider.getElementsByClassName("project-slide")[i].getElementsByClassName("project-languages")[0];
            project.languages.forEach((language) => {
                project_languages.innerHTML +=
                    `<img src="${ language.img }" alt="${ language.title }">`
            })
        }
    }

    function injectContact() {
        document.getElementsByName("contact-form")[0].setAttribute("action", "https://formspree.io/" + data.user.email);
    }
}
