// Funksjon for å "shrinke" navbar når den går under 400px. Dette er i tilfelle man er på mobil. 
function NavSwitchToSmallResponsive() {
    var x = document.getElementById("myNavBar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }


// Funksjon for scroll til element
function ScrollToElement() {
    var elmnt = document.getElementById("Serverdrift");
    elmnt.scrollIntoView(true);
  }

