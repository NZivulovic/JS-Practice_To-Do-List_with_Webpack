
import "./styles.css";

// SVG imports

import inboxSVG from "./svgs/inbox_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import homeSVG from "./svgs/home_16dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.svg";
import completedSVG from "./svgs/done_all_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
//



const newInboxSVG = new Image();
// const newHomeSVG = new Image();
const newCompletedSVG = new Image();

newInboxSVG.src = inboxSVG;
// newHomeSVG.src = homeSVG;
// newHomeSVG.style.cssText = "width: 2vw; height: 100%; margin: auto 0;"
newCompletedSVG.src = completedSVG;
//

const defaultProjectDiv = document.querySelector(".defaultProject");
// const mainHeaderDiv = document.querySelector(".mainHeaderHomeDiv");

defaultProjectDiv.insertBefore(newInboxSVG, document.querySelector(".projectText"));
// mainHeaderDiv.insertBefore(newHomeSVG, document.querySelector(".mainHeaderHomeText"));


// DOM New Task 

const createNewTaskDOM = (() => {

    // current page DOM removal
    const innerMiddlePanel = document.querySelector('.innerMiddlePanel');

    const removeCurrentPageContent = () => {
        if (innerMiddlePanel.hasChildNodes()) {
            while (innerMiddlePanel.firstChild) {
                innerMiddlePanel.removeChild(innerMiddlePanel.firstChild);
            }
        }
    }

    // buttons for creating Tasks
    const newTaskButtonMain = document.querySelector('.newTaskButtonMain');
    const newTaskButtonLeftPanel = document.querySelector('.leftPanelYourProjectHeaderPlusButton');

    newTaskButtonMain.addEventListener('click', () => {
        removeCurrentPageContent();
    })
    newTaskButtonLeftPanel.addEventListener('click', () => {
        removeCurrentPageContent();
    })



    
    return { removeCurrentPageContent };
})();
