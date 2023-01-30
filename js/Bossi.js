window.onresize = function (){
    if (document.querySelector('content') && window.innerWidth <=768){
        console.log('switch to Mobil')
    }
    if (document.querySelector('mobileContent') && window.innerWidth >768){
        console.log('switch to Desktop')
    }

}