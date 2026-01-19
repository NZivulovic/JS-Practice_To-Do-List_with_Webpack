const fns = require('date-fns')
const currentDateTimestamp = fns.format(new Date(), "yyyy-MM-dd'-'HH:mm:ss.SSS");

import "./styles.css";

// SVG imports

import inboxSVG from "./svgs/inbox_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import homeSVG from "./svgs/home_16dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.svg";
import completedSVG from "./svgs/done_all_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import arrowDropDownSVG from "./svgs/arrow_drop_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import alertSVG from "./svgs/add_alert_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import calendarSVG from "./svgs/calendar_month_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import flagSVG from "./svgs/flag_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import moreSVG from "./svgs/more_horiz_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import starSVG from "./svgs/star_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"


//  SVG 

const addSvgToDOM = (() => {

    // takes DOM Selectors and creates new SVG then Appends or insertsBefore
    const addSvg = (parentSelector, svgSrc, beforeSelector = null, className = "", ID = '') => {
        const svg = new Image();
        svg.src = svgSrc;
        if (className) svg.classList.add(className);
        if (ID) svg.id = ID;

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
addSvgToDOM.addSvg("#star1", starSVG, null, '', 'star1');
addSvgToDOM.addSvg("#star2", starSVG, null, '', 'star2');
addSvgToDOM.addSvg("#star2", starSVG, null, '', 'star2');
addSvgToDOM.addSvg("#star3", starSVG, null, '', 'star3');
addSvgToDOM.addSvg("#star3", starSVG, null, '', 'star3');
addSvgToDOM.addSvg("#star3", starSVG, null, '', 'star3');

document.querySelector(".mainHeaderHomeSVG").style.cssText = "width: 2vw; height: 100%; margin: auto 0;"


// taskForm, set date min to today



const interfaceHandler = (() => {


    const toggleUI = (targetID, hideOthers = false) => {
        const targetElement = document.getElementById(targetID);
        const innerMiddlePanel = document.querySelector('.innerMiddlePanel');

        if (!targetElement) return;

        const isVisible = targetElement.style.display === 'flex';

        if (hideOthers && innerMiddlePanel.hasChildNodes) {
            Array.from(innerMiddlePanel.children).forEach(node => {
                node.style.display = 'none';
            });
        };

        targetElement.style.display = isVisible ? 'none' : 'flex';
    };

    const UI_Map = {
        'createProjectButton': { target: 'newProjectLeftPanel' },
        'createTaskButton': { target: 'taskForm', hideOthers: true },
        'btn6': { target: 'createTask', hideOthers: true },
        'btn2': { target: 'taskFormPrioritiesDiv', hideOthers: false },
        'btn1': { target: 'taskFormOptionDateSelector', hideOthers: false },
        'btn5': { target: 'selectProjectTaskForm', hideOthers: false }
    }

    Object.keys(UI_Map).forEach(buttonID => {
        const button = document.getElementById(buttonID);
        if (button) {
            button.addEventListener('click', () => {
                const openMenu = UI_Map[buttonID]
                toggleUI(openMenu.target, openMenu.hideOthers);
            });
        }
    })

    const taskFormPriority = document.querySelectorAll('.taskFormPrioritiesOption');
    taskFormPriority.forEach(element => {
        element.addEventListener('click', (e) => {
            let priorityID = e.target.id;
            console.log(priorityID)
            toggleUI('taskFormPrioritiesDiv');
        })
    });
    const projectSelect = document.querySelectorAll('.defaultProjectTaskForm');
    projectSelect.forEach(proj => {
        if (proj) {
            proj.addEventListener('click', (e) => {
                let projID = e.target.id;
                console.log(projID)
                toggleUI('selectProjectTaskForm');
            })
        }
    });

    document.getElementById('taskFormOptionDateSelector').min = new Date().toLocaleDateString().split('T')[1];
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
    document.querySelector(".defaultProject").setAttribute('id', currentProjects[0].ID);

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

        constructor(title, icon, ID) {
            this.title = title;
            this.icon = icon;
            this.ID = ID;
        };

        createProjectElementLeftPanel() {
            const projectLeftPanelDiv = document.createElement('div');
            projectLeftPanelDiv.classList.add("defaultProject");
            projectLeftPanelDiv.id = this.ID

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
        createProjectElementTaskForm() {
            const projectTaskFormDiv = document.createElement('div');
            projectTaskFormDiv.classList.add("defaultProjectTaskForm");
            projectTaskFormDiv.id = this.ID

            const svg = new Image();
            svg.classList.add('projectText');
            svg.src = this.icon;

            const text = document.createElement('p');
            text.classList.add("projectText");
            text.innerText = this.title;

            projectTaskFormDiv.appendChild(svg);
            projectTaskFormDiv.appendChild(text);

            document.querySelector("#selectProjectTaskForm").appendChild(projectTaskFormDiv);
        }

    };

    const DOMhandling = () => {

        const leftPanelIconSelectorDiv = document.querySelector(".newProjectLeftPanelIconSelect");
        const warningDiv = document.querySelector(".projectNameWarningLeftPanelDiv")
        const parentNodeIcons = leftPanelIconSelectorDiv.children;
        const svgs = [inboxSVG, completedSVG, calendarSVG, flagSVG, alertSVG, moreSVG];
        let selectedSVG = '0';

        for (const node of parentNodeIcons) {
            node.addEventListener("click", (e) => {
                selectedSVG = e.currentTarget.id;
                leftPanelIconSelectorDiv.style.display = 'none';
                console.log(selectedSVG);
            })
        }

        window.addEventListener('click', (e) => {
            if (e.target.id === 'selectIconButton' && document.querySelector(".newProjectLeftPanelIconSelect").style.display === 'none') {
                document.querySelector(".newProjectLeftPanelIconSelect").style.display = 'flex';
            }
            else {
                document.querySelector(".newProjectLeftPanelIconSelect").style.display = 'none';
            }
        });

        window.addEventListener('click', (e) => {
            const projectElement = e.target.closest('.defaultProject');

            if (projectElement) {
                const projectID = projectElement.id;
                const exists = currentProjects.some(p => p.ID === projectID);

                if (exists) {
                    document.querySelector('.innerMiddlePanel').style.display = 'none';

                    // loadProjectTasks(projectID);
                }
            }
        });



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
                const ID = crypto.randomUUID();
                new createProject(newVal, svgs[selectedSVG], ID).createProjectElementLeftPanel(); // left panel
                new createProject(newVal, svgs[selectedSVG], ID).createProjectElementTaskForm(); // task form
                new storeProject(newVal, svgs[selectedSVG], ID, currentDateTimestamp).save();

                document.querySelector("#newProjectLeftPanel").style.display = 'none';
                document.querySelector(".leftPanelYourProjectHeaderText").nextElementSibling.id = ID;
                document.querySelector(".newProjectLeftPanelInput").value = '';
                console.log(currentProjects);
            }
        });
    };

    DOMhandling();

})();




const taskCreation = (() => {

    // Task Form
    const taskForm = document.querySelector("#taskForm");

    let currentTasks = [];

    class storeTask {
        constructor(title, description, date, priority, reminders, project, ID) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.reminders = reminders;
            this.project = project;
            this.ID = ID;
        }
        save() {
            currentTasks.push({
                title: this.title,
                description: this.description,
                date: this.date,
                priority: this.priority,
                reminders: this.reminders,
                project: this.project,
                ID: this.ID
            });
        };
    };

    class createTask {
        constructor(title, description, date, priority, reminders, project, ID) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.reminders = reminders;
            this.project = project;
            this.ID = ID;
        };
        createTaskElement() {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add("taskContainer");
            taskDiv.id = this.ID
            taskDiv.setAttribute('project', `${this.project}`)

            const titleDiv = document.createElement('div');
            const title = document.createElement('p');
            title.classList.add("taskItem");
            title.id = ("taskTitle");
            titleDiv.classList.add("taskDiv");
            titleDiv.id = ("taskTitleDiv");
            title.innerText = 'Title: ' + this.title;
            titleDiv.appendChild(title)
            taskDiv.appendChild(titleDiv);

            if (this.description) {
                const descDiv = document.createElement('div');
                const desc = document.createElement('p');
                desc.classList.add("taskItem");
                desc.id = ("taskDesc");
                descDiv.classList.add("taskDiv");
                descDiv.id = ("taskDescDiv");
                desc.innerText = 'Description: ' + this.description;
                descDiv.appendChild(desc)
                taskDiv.appendChild(descDiv);
            }

            if (this.date) {
                const dateDiv = document.createElement('div');
                const date = document.createElement('p');
                date.classList.add("taskItem");
                date.id = ("taskDate");
                dateDiv.classList.add("taskDiv");
                dateDiv.id = ("taskDateDiv");
                date.innerText = 'Due Date: ' + this.date;
                dateDiv.appendChild(date)
                taskDiv.appendChild(dateDiv);
            }

            if (this.priority) {
                const priorityDiv = document.createElement('div');
                const priority = document.createElement('p');
                priority.classList.add("taskItem");
                priority.id = ("taskPriority");
                priorityDiv.classList.add("taskDiv");
                priorityDiv.id = ("taskPriorityDiv");
                priority.innerText = 'Priority: ' + this.priority;
                priorityDiv.appendChild(priority)
                taskDiv.appendChild(priorityDiv);
            }

            if (this.reminders) {
                const remindersDiv = document.createElement('div');
                const reminders = document.createElement('p');
                reminders.classList.add("taskItem");
                reminders.id = ("taskReminder");
                remindersDiv.classList.add("taskDiv");
                remindersDiv.id = ("taskRemindersDiv");
                reminders.innerText = 'Reminders: ' + this.reminders;
                remindersDiv.appendChild(reminders)
                taskDiv.appendChild(remindersDiv);
            }
            if (this.project) {
                const project = document.createElement('p');
                project.classList.add("taskItem");
                project.id = ("taskProject");
                project.innerText = this.project;
                // taskDiv.appendChild(project);
            }

            document.querySelector(".innerMiddlePanel").appendChild(taskDiv);
        };



    }

    let taskFormPriority = 'star1'
    let taskFormReminders = 'None'
    let taskFormProject = 'Default Project'


    const priorityContainer = document.querySelector("#taskFormPrioritiesDiv");

    priorityContainer.addEventListener('click', (e) => {

        const priorityItem = e.target.closest('.taskFormPrioritiesOption');
        if (priorityItem && priorityContainer.contains(priorityItem)) {
            taskFormPriority = priorityItem.id;
            console.log(taskFormPriority);
        }
    });

    const projectContainer = document.querySelector("#selectProjectTaskForm");

    projectContainer.addEventListener('click', (e) => {

        const projectItem = e.target.closest('.defaultProjectTaskForm');
        if (projectItem && projectContainer.contains(projectItem)) {
            taskFormProject = projectItem.id;
            console.log(taskFormProject);
        }
    });

    // make remindersContainer

    const DOMhandling = () => {

        const title = document.querySelector(".taskFormInputTitle").value.trim();
        const description = document.querySelector(".taskFormInputDescription").value.trim();
        const date = document.querySelector("#taskFormOptionDateSelector").value.trim();
        const priority = taskFormPriority
        const reminders = taskFormReminders
        const project = taskFormProject
        const ID = crypto.randomUUID()



        // make special WarningDiv for TaskForm

        const warningDiv = document.querySelector("#taskFormWarningDiv")
        const showWarning = (text) => {
            warningDiv.innerText = text;
            warningDiv.style.display = 'flex';
            warningDiv.style.color = 'red';
            setTimeout(() => { warningDiv.style.display = 'none'; }, 1000);
        };

        if (title === '') {
            showWarning('Title empty!')
        }
        else if (currentTasks.some(task => task.title === title)) {
            showWarning('Task with that name already exists!')
        }
        else {
            new createTask(title, description, date, priority, reminders, project, ID).createTaskElement();
            new storeTask(title, description, date, priority, reminders, project, ID).save();

            console.log(currentTasks);
        }
    };


    document.querySelector(".taskFormFinalizeAddTaskButton").addEventListener('click', () => {
        DOMhandling();
    });


})();