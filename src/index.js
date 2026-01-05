const fns = require('date-fns')
const currentDateTimestamp = fns.format(new Date(), "yyyy-MM-dd'-'HH:mm:ss.SSS");

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

const interfaceHandlingDOM = (() => {


    // buttons for creating Tasks
    const newTaskButtonMain = document.querySelector('.newTaskButtonMain');    // Home Page Middle Button
    const newTaskButtonLeftPanel = document.querySelector('.leftPanelYourProjectHeaderPlusButton');  // Left Panel Button

    if (newTaskButtonMain) {
        newTaskButtonMain.addEventListener('click', (e) => {
            console.log(e.target.id);
            showMenu(e.target.id);
        })
    }

    newTaskButtonLeftPanel.addEventListener('click', (e) => {
        console.log(e.target.id);
        showMenu(e.target.id);
    })

    // current page
    const innerMiddlePanel = document.querySelector('.innerMiddlePanel');


    const showMenu = (targetID) => {

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

    document.querySelector('.leftPanel').addEventListener('click', (e) => {
        if (e.target.id === 'selectIconButton' && document.querySelector(".newProjectLeftPanelIconSelect").style.display === 'none') {
            document.querySelector(".newProjectLeftPanelIconSelect").style.display = 'flex';
        }
        else {
            document.querySelector(".newProjectLeftPanelIconSelect").style.display = 'none';
        }
    });


})();


const projectCreation = (() => {


    let currentProjects = [
        {
            name: 'Default Project',
            svg: '0',
            ID: `${crypto.randomUUID()}`,
            date: `${fns.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS")}`
        }
    ];


    class storeProject {
        constructor(name, svg, ID, date) {
            this.name = name;
            this.svg = svg
            this.ID = ID;
            this.date = date;
        };

        save() {
            currentProjects.push({
                name: this.name,
                svg: this.svg,
                ID: this.ID,
                date: this.date
            });
        };
    };

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



    const DOMhandling = () => {

        const leftPanelIconSelector = document.querySelector(".newProjectLeftPanelIconSelect");
        const parentNodeIcons = leftPanelIconSelector.children;


        let selectedSVG = '0';
        const svgs = [inboxSVG, completedSVG, calendarSVG, flagSVG, alertSVG, moreSVG];

        for (const node of parentNodeIcons) {
            node.addEventListener("click", (e) => {
                selectedSVG = e.currentTarget.id;
                leftPanelIconSelector.style.display = 'none';
                console.log(selectedSVG);
            })
        }

        const warningDiv = document.querySelector(".projectNameWarningLeftPanelDiv")
        
        document.querySelector(".newProjectLeftPanelAddProjectButton").addEventListener('click', () => {
            let newVal = document.querySelector(".newProjectLeftPanelInput").value.trim();
            
            const showWarning = (text) => {
                warningDiv.innerText = text;
                warningDiv.style.display = 'flex';
                warningDiv.style.color = 'red';
                setTimeout(() => { warningDiv.style.display = 'none'; }, 1000);
            };
            
            if (newVal === '') {
                showWarning('Title empty!')
            }
            else if (currentProjects.some(project => project.name === newVal)) {
                showWarning('Project with that name already exists!')
            }
            else {
                new createProject(newVal, svgs[selectedSVG]).createProjectElement();
                const ID = crypto.randomUUID();
                new storeProject(newVal, svgs[selectedSVG], ID, currentDateTimestamp).save();
                document.querySelector("#newProjectLeftPanel").style.display = 'none';
                document.querySelector(".leftPanelYourProjectHeaderText").nextElementSibling.id = ID;
                document.querySelector(".newProjectLeftPanelInput").value = '';
                console.log(currentProjects);
            }
        });
    };

    window.setTimeout(DOMhandling, 500);

})();


