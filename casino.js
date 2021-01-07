function gid(el) {
  return document.getElementById(el);
};

function gcn(cn) {
  return document.getElementsByClassName(cn);
}

gid("openPanel").onclick = function() {
  gid("myPanel").style.display = "block";
}

window.onclick = function(event) {
  if (event.target == gid("myPanel")) {
    gid("myPanel").style.display = "none";
    for (var i = 0; i < gcn("admin").length; i++) {
      gcn("admin")[i].style.display = "none";
    }
    gid("panelPassword").style.display = "inline"
    gid("panelPassword").value = "";
    localStorage.admin = "091503"
  }
}

function panelPassword() {
  if (gid("panelPassword").value == localStorage.admin) {
    for (var i = 0; i < gcn("admin").length; i++) {
      gcn("admin")[i].style.display = "inline";
    }
    gid("panelPassword").style.display = "none"
  }
  else {
    gid("panelPassword").value = "";
  }
}

function checking() {
  if ((localStorage.currency) == "undefined") {
      localStorage.currency = 1;
  } 
  else {
    return
  }
}

function adminPanel() {
  gcn("adminPanel").classList.toggle("show")
}

gid("placeholder").innerHTML = "$" + localStorage.currency;

function currency(amount) {
  if(typeof(Storage) !== "undefined") {
    if (amount == 0) {
      localStorage.currency = 0
    }
    else {
      if (localStorage.currency) {
        localStorage.currency = Number(localStorage.currency)+amount;
      }
    }
    gid("placeholder").innerHTML = "$" + localStorage.currency;
  } 
  else {
    gid("error").innerHTML = "Error";
  }
}