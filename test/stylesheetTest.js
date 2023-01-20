function blue() {
  disableStylesheets();
  document.getElementById('stylesheetBlue').disabled = false;
}


function green() {
  disableStylesheets();
  document.getElementById('stylesheetGreen').disabled = false;
}

function red() {
  disableStylesheets();
  document.getElementById('stylesheetRed').disabled = false;
}


function off() {
  disableStylesheets();
}


// deaktiviert alle stylsheets
function disableStylesheets() {
  let links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (link.rel === "stylesheet") {
      link.disabled = true;
    }
  }
}
