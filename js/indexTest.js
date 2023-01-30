function loadStartDisplay(){
    if (window.innerWidth > 768){
        document.getElementById('page1').classList.remove('d-none');
        setTimeout(initPage1, 300);
    }
    if (window.innerWidth <= 768){
        console.log('mobile')
        document.getElementById('pageOneMob').classList.remove('d-none');
        document.getElementById('mobilMasterContainer').classList.remove('d-none');
        setTimeout(initLoginMob, 300);
    }
}


// window.onresize = function (){
//     if (window.innerWidth > 768){

//     }
//     if (window.innerWidth <= 768){

//     }
// }

async function loadApplicableSummary(){
    if (window.innerWidth > 768){
        document.getElementById('mobilSummary').classList.add('d-none');
        document.getElementById('desktopSummary').classList.remove('d-none');
        await deactivatMobil();
        init();
    }
    if (window.innerWidth <= 768){
        document.getElementById('desktopSummary').classList.add('d-none');
        document.getElementById('mobilSummary').classList.remove('d-none');
        await deactivatDesktop();
        initMobilSummary();
    }
}


let stylesheetDesktopDeactivationList =[
	'stylesheetMobilTemplates',
	'stylesheetMobilContacts',
	'stylesheetMobilAddContacts',
	'stylesheetSummaryMobil',
	'stylesheetHelpMobil',
];

let jsDesktopDeactivationList =[
	'jsMobilSummary',
	'jsMobilAddTask',
	'jsMobilBoard',
	'jsMobilContacts',
	'jsHelpMobil',
	'legalNoticeMobil',
]

let stylesheetMobilDeactivationList = [
    'stylesheetsummary',
    'stylesheetAddTask',
    'stylesheetBoard',
    'stylesheetContacts',
    'stylesheetResponsiv',
    'stylesheetHelp'  
]

let jsMobilDeactivationList = [
    'jsHelp',
]

async function deactivatMobil(){
	stylesheetDesktopDeactivationList.forEach(stylesheet => {
		document.getElementById(stylesheet).disabled = true;
	});
	jsDesktopDeactivationList.forEach(script => {
		document.getElementById(script).disabled = true;
	});
}

async function deactivatDesktop(){
	stylesheetMobilDeactivationList.forEach(stylesheet => {
		document.getElementById(stylesheet).disabled = true;
	});
	jsMobilDeactivationList.forEach(script => {
		document.getElementById(script).disabled = true;
	});
}



