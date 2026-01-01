
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


// DOM Manipulation

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

// Clear innerMiddlePage

const removeCurrentPage = (() => {

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

        for (const node of parentNodes) {
            if (node.id === "createTask") {
                node.style.display = "none";
                document.getElementById("taskForm").style.display = "flex";
            }

        }



    }

    // buttons for creating Tasks
    const newTaskButtonMain = document.querySelector('.newTaskButtonMain');    // Home Page Middle Button
    const newTaskButtonLeftPanel = document.querySelector('.leftPanelYourProjectHeaderPlusButton');  // Left Panel Button

    if (newTaskButtonMain) {
        newTaskButtonMain.addEventListener('click', (e) => {
            removeCurrentPageContent(e.target.id);
        })
    }

    newTaskButtonLeftPanel.addEventListener('click', (e) => {
        removeCurrentPageContent(e.target.id);
    })




    return { removeCurrentPageContent };
})();

