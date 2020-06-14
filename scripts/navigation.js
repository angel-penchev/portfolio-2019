function implementNavigation() {
    let current_section_slide = 0;
    let current_project_slide = 0;

    const section_slider = document.getElementsByClassName("section-slider")[0].getElementsByClassName("slide");
    const project_slider = section_slider[1].getElementsByClassName("slider")[0].getElementsByClassName("project-slide");
    const section_nav = document.getElementsByClassName("navigation")[0];
    const nav_arrow_sections = document.getElementsByClassName("navigation-arrows-sections")[0];
    const nav_arrow_projects = document.getElementsByClassName("navigation-arrows-project")[0];

    function refreshView() {
        for (let i = 0; i < section_slider.length; i++) {
            section_slider[i].classList.remove("is-active");
        }

        for (let i = 0; i < project_slider.length; i++) {
            project_slider[i].classList.remove("is-active");
        }

        section_slider[current_section_slide].classList.add("is-active");
        project_slider[current_project_slide].classList.add("is-active");
    }

    section_nav.getElementsByClassName("nav-technologies")[0].onclick = () => {
        current_section_slide = 0;
        refreshView();
    };

    section_nav.getElementsByClassName("nav-projects")[0].onclick = () => {
        current_section_slide = 1;
        refreshView();
    };

    section_nav.getElementsByClassName("nav-contact")[0].onclick = () => {
        current_section_slide = 2;
        refreshView();
    };

    nav_arrow_sections.getElementsByClassName("up")[0].onclick = () => {
        current_section_slide -= 1;
        if (current_section_slide < 0) {
            current_section_slide = section_slider.length - 1;
        }
        refreshView();
    };

    nav_arrow_sections.getElementsByClassName("down")[0].onclick = () => {
        current_section_slide += 1;
        if (current_section_slide > section_slider.length - 1) {
            current_section_slide = 0;
        }
        refreshView();
    };

    nav_arrow_projects.getElementsByClassName("left")[0].onclick = () => {
        current_project_slide -= 1;
        if (current_project_slide < 0) {
            current_project_slide = project_slider.length - 1;
        }
        refreshView();
    };

    nav_arrow_projects.getElementsByClassName("right")[0].onclick = () => {
        current_project_slide += 1;
        if (current_project_slide > project_slider.length - 1) {
            current_project_slide = 0;
        }
        refreshView();
    };

    document.getElementsByClassName("section-slider")[0].addEventListener('touchstart', handleTouchStart, false);
    document.getElementsByClassName("section-slider")[0].addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches;
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                current_project_slide -= 1;
                if (current_project_slide < 0) {
                    current_project_slide = project_slider.length - 1;
                }
                refreshView();
            } else {
                /* right swipe */
                current_project_slide += 1;
                if (current_project_slide > project_slider.length - 1) {
                    current_project_slide = 0;
                }
                refreshView();
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
                current_section_slide -= 1;
                if (current_section_slide < 0) {
                    current_section_slide = section_slider.length - 1;
                }
                refreshView();
            } else {
                /* down swipe */
                current_section_slide += 1;
                if (current_section_slide > section_slider.length - 1) {
                    current_section_slide = 0;
                }
                refreshView();
            }
        }

        /* reset values */
        xDown = null;
        yDown = null;
    };

    refreshView();
}
