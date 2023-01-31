let desktopInitFunctions =[
    initSummary(),
    initBoard(),
    initAddTask(),
    initContacts(),
    initLegalNotice(),
    initHelp(),
]


let mobilInitFunctions = [
    initMobilSummary(),
    initMobilBoard(),
    initMobilAddTask(),
    initMobilContacts(),
]

let stylesheetDesktopList = [
	// 'stylesheetStyle',
	// 'stylesheetIndex',
	// 'stylesheetIndexMob',
	'stylesheetAddTask',
	'stylesheetBoard',
	'stylesheetContacts',
	'stylesheetLegalNotice',
	'stylesheetsummary',
	'stylesheetResponsiv',
	'stylesheetBoardMobil',
	'stylsheetAddTaskMobil',
	'stylesheetHelp'
];

let scriptDesktopList = [
	'jsMiniBackend',
	'jsResponsiv',
	'jsScript',
	'jsAddTask',
	'jsAddTaskTemplates',
	'jsBoardPart1',
	'jsBoardPart2',
	'jsBoardPart3',
	'jsBoardTemplatesPart1',
	'jsBoardTemplatesPart2',
	'jsSignUp',
	'jsSignUpTemplates',
	'jsContactsTemplates',
	'jsContacts',
	'jslegalNotice',
	'jslegalNotice',
	'jsHelp',
	// 'jsLoginTemplates',
	// 'jsIndex',
	// 'jsLogin',
	
];

let stylesheetMobilList =[
	'stylesheetBoardMobil',
	'stylsheetAddTaskMobil',

	'stylesheetMobilTemplates',
	'stylesheetMobilContacts',
	'stylesheetMobilAddContacts',
	'stylesheetSummaryMobil',
	'stylesheetHelpMobil'
];

let jsMobilList =[
	'jsMobilLogin',
	'jsMobilSummary',
	'jsMobilAddTask',
	'jsMobilBoard',
	'jsMobilContacts',
	'jsHelpMobil',
	'legalNoticeMobil',
]


let menuSelectorStyles = [
	{
		background: 'background-color: #091931;',
		disabledBackground: 'background-color: unset;',
		color: 'color: #FFFFFF;',
		color1: 'color: default;',
		enableImg: 'imgDisplay',
		disableImg: 'imgDisplayNone',
	},
	{
		menuName: 'btn_summary_menu',
		img1Id: 'imgSummary1',
		img2Id: 'imgSummary2',
		url: './summary.html',
	},
	{
		menuName: 'btn_board_menu',
		img1Id: 'imgBoard1',
		img2Id: 'imgBoard2',
		url: './board.html', //hinzu gefügt//
	},
	{
		menuName: 'btn_add_task_menu',
		img1Id: 'imgAddTask1',
		img2Id: 'imgAddTask2',
		url: './add_task.html',
	},
	{
		menuName: 'btn_contacts_menu',
		img1Id: 'imgContacts1',
		img2Id: 'imgContacts2',
	},
	{
		menuName: 'btnLegalNotice',
		url: './legalNotice.html',
	},
];