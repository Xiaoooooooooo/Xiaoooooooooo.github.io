var jumpcount = 0;

function jumper() {
  this.x = window.innerWidth/2;
  this.y = 0;
  this.gravity = 0.5; //the force of gravity
  this.lift = -15; // the opposing force of gravity when i jump
  this.velocity = 0;//speed of gravity force
  this.speed = 10;
  
  //i am building a functipon to display on the screen. This is where i put my values of what the jumper will look like.
  this.show = function() {
    fill(255,0,0);
    ellipse(this.x,this.y,50,50);
    
  };
  
  //build a function called up that will take the initial velocity and modify by opposing gravity
  this.up = function() {
    if (jumpcount < 3)
    this.velocity += this.lift;
    jumpcount++
  };
  
  //this is continuously update the jumper
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.9; //air resistance
    //this will prevent the jumper from leaving the ground
    
      this.y = height -25;
      this.velocity = 0;
      jumpcount = 0;
    
    //this will prevent the jumper from leaving the top of the screen
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    
  };
  
}
