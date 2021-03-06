function barrier() {
  this.y = Math.floor(Math.random() * window.innerHeight);
  this.x = window.innerWidth - 25;
  this.speed = Math.floor((Math.random() * 6)+10); //speed of barrier
  this.velocity = 0;//speed of gravity force
  
  this.show = function() {
    fill(0,0,255);
    rect(this.x,this.y,25,200);
  };
  
  
  this.update = function() {
    this.x -= this.speed;
    this.velocity = 0; //air resistance
    if (this.x < 0) {
      this.x = window.innerWidth;
      this.y = Math.floor(Math.random() * window.innerHeight);
      this.speed = Math.floor((Math.random() * 6)+10);
      document.getElementById("count").innerHTML++;
      if (document.getElementById("count").innerHTML >= 5) {
        this.speed +=3;
        if (document.getElementById("count").innerHTML >= 30) {
          this.speed = 30;
        }
      }
    }
  }
}