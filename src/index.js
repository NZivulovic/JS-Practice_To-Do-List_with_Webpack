
import "./styles.css";

// SVG imports

import inboxSVG from "./svgs/inbox_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import homeSVG from "./svgs/home_16dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.svg";
import completedSVG from "./svgs/done_all_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import arrowDropDownSVG from "./svgs/arrow_drop_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import alertSVG from "./svgs/add_alert_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
import calendarSVG from "./svgs/calendar_month_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
import flagSVG from "./svgs/flag_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
import moreSVG from "./svgs/more_horiz_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"


//  // DOM Manipulation

const addSvgToDOM = (() => {

    // takes DOM Selectors and creates new SVG then Appends or insertsBefore
    const addSvg = (parentSelector, svgSrc, beforeSelector = null, className = "") => {
        const svg = new Image();
        svg.src = svgSrc;
        if (className) svg.classList.add(className);

        const parent = document.querySelector(parentSelector);
        const reference = beforeSelector ? parent.querySelector(beforeSelector) : null;

        if (reference) {
            parent.insertBefore(svg, reference);
        } else {
            parent.appendChild(svg);
        }

    }

    return { addSvg };
})();

// All SVG Additions
addSvgToDOM.addSvg(".taskFormFinalizeProjectSelectButton", inboxSVG, "#btn5.taskFormOptionText");
addSvgToDOM.addSvg("#btn1.taskFormOption", calendarSVG, "#btn1.taskFormOptionText");
addSvgToDOM.addSvg("#btn2.taskFormOption", flagSVG, "#btn2.taskFormOptionText");
addSvgToDOM.addSvg("#btn3.taskFormOption", alertSVG, "#btn3.taskFormOptionText");
addSvgToDOM.addSvg(".mainHeaderHomeDiv", homeSVG, ".mainHeaderHomeText", "mainHeaderHomeSVG");
addSvgToDOM.addSvg("#btn4.taskFormOption", moreSVG);
addSvgToDOM.addSvg(".taskFormFinalizeProjectSelectButton", arrowDropDownSVG);
addSvgToDOM.addSvg(".defaultProject", inboxSVG, ".projectText", "projectText");

document.querySelector(".mainHeaderHomeSVG").style.cssText = "width: 2vw; height: 100%; margin: auto 0;"

// Clear innerMiddlePage - DOM

const removeCurrentPage = (() => {


    // buttons for creating Tasks
    const newTaskButtonMain = document.querySelector('.newTaskButtonMain');    // Home Page Middle Button
    const newTaskButtonLeftPanel = document.querySelector('.leftPanelYourProjectHeaderPlusButton');  // Left Panel Button

    if (newTaskButtonMain) {
        newTaskButtonMain.addEventListener('click', (e) => {
            console.log(e.target.id);
            removeCurrentPageContent(e.target.id);
        })
    }

    newTaskButtonLeftPanel.addEventListener('click', (e) => {
        console.log(e.target.id);
        removeCurrentPageContent(e.target.id);
    })

    // current page
    const innerMiddlePanel = document.querySelector('.innerMiddlePanel');


    const removeCurrentPageContent = (targetID) => {
        // if (innerMiddlePanel.hasChildNodes()) {
        //     while (innerMiddlePanel.firstChild) {
        //         innerMiddlePanel.removeChild(innerMiddlePanel.firstChild);
        //     }
        // }


        const parentNodes = innerMiddlePanel.children
        console.log(innerMiddlePanel.children);
        console.log(targetID);

        for (const node of parentNodes) {
            if (targetID === "createProjectButton") {

                document.getElementById("newProjectLeftPanel").style.display = "flex";
            }
            else if (targetID === "createTaskButton") {
                node.style.display = "none";
                document.getElementById("taskForm").style.display = "flex";
            }
            else {
                return;
            }


        }

    }


})();



const projectCreation = (() => {


    class createProject {

        constructor(title, icon) {
            this.title = title;
            this.icon = icon;
        };

        createProjectElement() {
            const projectLeftPanelDiv = document.createElement('div');
            projectLeftPanelDiv.classList.add("defaultProject");

            const svg = new Image();
            svg.classList.add('projectText');
            svg.src = this.icon;

            const text = document.createElement('p');
            text.classList.add("projectText");
            text.innerText = this.title;

            projectLeftPanelDiv.appendChild(svg);
            projectLeftPanelDiv.appendChild(text);

            document.querySelector(".headerLeftPanel").insertBefore(projectLeftPanelDiv, document.querySelector(".defaultProject"));
        };
    };

    let svgs = { 'inboxSVG': 0 };
    let selectedSVG = 0; // make dynamic

    let currentProjects = { 'Default Project': 0, }; // make dynamic

    let oldVal = "";
    let newVal = document.querySelector(".newProjectLeftPanelInput").value;

    const checkValue = () => {
        document.querySelector(".newProjectLeftPanelAddProjectButton").addEventListener('click', () => {
            newVal = document.querySelector(".newProjectLeftPanelInput").value;
            if (oldVal !== newVal) {
                oldVal = newVal;
                new createProject(newVal, flagSVG).createProjectElement();
                document.querySelector("#newProjectLeftPanel").style.display = 'none';
                document.querySelector(".leftPanelYourProjectHeaderText").nextElementSibling.id = newVal + ' ' + `${svgs.test}`; // make dynamic 
                Object.assign(currentProjects, { newVal: svgs.inboxSVG })
                console.log(currentProjects);
            }
            else if (oldVal === newVal) {
                document.querySelector(".projectNameWarningLeftPanelDiv").style.display = 'flex';
            }
            const warning = () => { document.querySelector(".projectNameWarningLeftPanelDiv").style.display = 'none' };
            window.setTimeout(warning, 1000);
        })
    };

    window.setTimeout(checkValue, 500);

})();


