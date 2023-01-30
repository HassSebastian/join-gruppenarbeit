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

function loadApplicableSummary(){
    if (window.innerWidth > 768){
        document.getElementById('mobilSummary').classList.add('d-none');
        document.getElementById('desktopSummary').classList.remove('d-none');
        init();
    }
    if (window.innerWidth <= 768){
        document.getElementById('desktopSummary').classList.add('d-none');
        document.getElementById('mobilSummary').classList.remove('d-none');
        initMobilSummary();
    }
}