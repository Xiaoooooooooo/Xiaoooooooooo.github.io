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
gid("username").onclick = function(event) {
  var name = prompt("Please enter your name:")
  localStorage.name = name
  user.nameUpdate()
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
      user.balanceMinimum()
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
      user.balanceUpdate()
    } 
    else {
      gid("error").innerHTML = "Error";
    }
  },
}

var user = {
  balanceChecking: function() {
    if ((localStorage.currency) == undefined) {
      localStorage.currency = 0;
      user.balanceUpdate();
    }
    else if ((localStorage.name) == undefined) {
      localStorage.name = "Anonymous";
      localStorage.currency = 1000
      user.balanceUpdate();
      user.nameUpdate();
    }
    else {
      user.balanceUpdate();
      user.nameUpdate();
      return;
    }
  },
  balanceUpdate: function() {
    gid("balance").innerHTML = "$" + localStorage.currency;
  },
  balanceMinimum: function() {
    if (localStorage.currency <= 0) {
      localStorage.currency = 100;
      user.balanceUpdate();
    }
    else {
      return
    }
  },
  nameUpdate: function() {
    gid("username").innerHTML = localStorage.name
  }
}


var blackjack = {
  player: [],
  dealer: [],
  start: function() {
    if (Number(localStorage.currency) < gid("blackjackAmount").value) {
      gid("bjDesc").value = "Not Enough $"
      gid("blackjackAmount").value = ""
      return
    }
    if (isNaN(gid("blackjackAmount").value) === true) {
      gid("bjDesc").innerHTML = "Type in a number please."
      gid("blackjackAmount").value = ""
      return
    }
    this.player = [];
    this.dealer = [];
    gid("player").innerHTML = ""
    gid("dealer").innerHTML = ""
    gid("result").innerHTML = ""
    for (var i = 0; i < 4; i++) {
      var randomNum = Math.floor(Math.random()*13)+1
      if (i < 2) {
        this.convert(this.player, randomNum)
      }
      else {
        this.convert(this.dealer, randomNum)
      }
    }
    localStorage.currency -= Number(gid("blackjackAmount").value)
    user.balanceUpdate()
    gid("blackjackBelow").style.display = "none";
    gid("hitStand").style.display = "block";
    if (this.handTotal(this.dealer) == 21) {
      gid("result").innerHTML = "Defeat"
      gid("result").style.color = "red"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have lost."
      gid("blackjackAmount").value = ""
    }
    if (this.handTotal(this.player) == 21) {
      gid("result").innerHTML = "Victory"
      gid("result").style.color = "Green"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have won $" + (gid("blackjackAmount").value *2) + "."
      localStorage.currency = Number(localStorage.currency) + Number(gid("blackjackAmount").value*2)
      user.balanceUpdate()
      gid("blackjackAmount").value = ""
    }
    console.log(gid("bjDesc").innerHTML)
  },
  hit: function() {
    var randomNum = Math.floor(Math.random()*13)+1
    this.convert(this.player, randomNum)
    this.check()
    if (this.handTotal(this.dealer) == 21) {
      gid("result").innerHTML = "Defeat"
      gid("result").style.color = "red"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have lost."
      gid("blackjackAmount").value = ""
    }
    if (this.handTotal(this.player) == 21) {
      gid("result").innerHTML = "Victory"
      gid("result").style.color = "Green"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have won $" + (gid("blackjackAmount").value *2) + "."
      localStorage.currency = Number(localStorage.currency) + Number(gid("blackjackAmount").value*2)
      user.balanceUpdate()
      gid("blackjackAmount").value = ""
    }
  },
  stand: function() {
    while (this.handTotal(this.dealer) <= 17) {
      var randomNum = Math.floor(Math.random()*13)+1
      this.convert(this.dealer, randomNum)
    }
    if (this.check() === false || this.check() === true) {
      return
    }
    if (this.handTotal(this.dealer) >= this.handTotal(this.player)) {
      gid("result").innerHTML = "Defeat"
      gid("result").style.color = "red"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have lost."
      gid("blackjackAmount").value = ""
    }
    else {
      gid("result").innerHTML = "Victory"
      gid("result").style.color = "green"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have won $" + (gid("blackjackAmount").value *2) + "."
      localStorage.currency = Number(localStorage.currency) + Number(gid("blackjackAmount").value*2)
      user.balanceUpdate()
      gid("blackjackAmount").value = ""
    }
  },
  check: function() {
    if (this.handTotal(this.player) > 21) {
      gid("result").innerHTML = "Defeat"
      gid("result").style.color = "red"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have lost."
      gid("blackjackAmount").value = ""
      return false;
    }
    if (this.handTotal(this.dealer) > 21) {
      gid("result").innerHTML = "Victory"
      gid("result").style.color = "green"
      gid("blackjackBelow").style.display = "block";
      gid("hitStand").style.display = "none";
      gid("bjDesc").innerHTML = "You have won $" + (gid("blackjackAmount").value *2) + "."
      localStorage.currency = Number(localStorage.currency) + Number(gid("blackjackAmount").value*2)
      user.balanceUpdate()
      gid("blackjackAmount").value = ""
      return true;
    }
  },
  convert: function(hand, randomNum) {
    if (hand == this.player) {
      var id = "player"
    }
    if (hand == this.dealer) {
      var id = "dealer"
    }
    if (randomNum == 11) {
      randomNum = 10
      hand.push(randomNum)
      gid(id).innerHTML += "J" + " "
    }
    else if (randomNum == 12) {
      randomNum = 10
      hand.push(randomNum)
      gid(id).innerHTML += "Q" + " "
    }
    else if (randomNum == 13) {
      randomNum = 10
      hand.push(randomNum)
      gid(id).innerHTML += "K" + " "
    }
    else {
      hand.push(randomNum)
      gid(id).innerHTML += randomNum + " "
    }
  },
  handTotal: function(hand) {
    var total = 0;
    var aceFlag = 0;
    for (var i = 0; i < hand.length; i++) {
        total += hand[i];
        if (hand[i] == 1) {
          aceFlag += 1;
      }
    }
    for (var j = 0; j < aceFlag; j++) {
        if (total + 10 <= 21) {
          total +=10;
      }
    }
    return total;
  }
}
