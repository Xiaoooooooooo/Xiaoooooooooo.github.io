function barrier() {
  this.y = Math.floor(Math.random() * window.innerHeight);
  this.x = window.innerWidth - 25;
  this.gravity = 15; //the force of gravity
  this.lift = -12; // the opposing force of gravity when i jump
  this.velocity = 0;//speed of gravity force
  
  this.show = function() {
    fill(0,0,255);
    rect(this.x,this.y,25,150);
  };
  

  this.update = function() {
    this.velocity += this.gravity;
    this.x -= this.velocity;
    this.velocity = 0; //air resistance
    if (barrier.x < 0) {
      barrier.x = window.innerWidth;
      barrier.y = Math.floor(Math.random() * window.innerHeight);
    }
  }
}