function gid(el) {
  return document.getElementById(el);
};

gid("placeholder").innerHTML = "$" + localStorage.currency;

function currency() {
  if(typeof(Storage) !== "undefined") {
    if (localStorage.currency) {
      localStorage.currency = Number(localStorage.currency)+1;
    } else {
      localStorage.currency = 1;
    }
    gid("placeholder").innerHTML = "$" + localStorage.currency;
  } else {
    gid("error").innerHTML = "Error";
  }
}