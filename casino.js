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
    gid("panelPassword").style.display = "inline";
    gid("panelPassword").value = "";
  }
}

var adminPanel = {

  panelPassword: function() {
    if (gid("panelPassword").value == localStorage.admin) {
      for (var i = 0; i < gcn("admin").length; i++) {
        gcn("admin")[i].style.display = "inline";
      }
      gid("panelPassword").style.display = "none";
    }
    else {
      gid("panelPassword").value = "";
      localStorage.currency = Number(localStorage.currency)-1;
      balance.minimum()
    }
  },

  currency: function(amount) {
    if(typeof(Storage) !== "undefined") {
      if (amount == 0) {
        localStorage.currency = 0;
      }
      else {
        if (localStorage.currency) {
          localStorage.currency = Number(localStorage.currency)+amount;
        }
      }
      balance.update()
    } 
    else {
      gid("error").innerHTML = "Error";
    }
  },
}

var balance = {
  checking: function() {
    if ((localStorage.currency) == undefined) {
      localStorage.currency = 0;
      localStorage.name = "Anonymous";
    } 
    else {
      return
    }
  },
  update: function() {
    gid("placeholder").innerHTML = "$" + localStorage.currency;
  },
  minimum: function() {
    if (localStorage.currency <= 0) {
      localStorage.currency = 0;
      balance.update();
    }
    else {
      return
    }
  }
}

balance.update()

var localScoreBoard = {
  data: [],

  addScore: function(name, score) {
    // Add the new score to end of 'data'
    this.data.push([name, score]);

    // Sort data by all of the scores
    this.data.sort(function(a, b) {
      return a[1] > b[1];
    });

    // Take just the top 5 elements
    if (data.length > 5) {
      this.data = this.data.splice(0, 5);
    }
  },

  getScores: function() {
    return this.data;
  },

  saveScores: function() {
    localStorage.setItem('scoreboard', this.data);
  },

  loadScores: function() {
    localStorage.getItem('scoreboard');
  },
}