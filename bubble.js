function buff() {
  this.y = Math.floor(Math.random() * window.innerHeight);
  this.x = window.innerWidth - 25;
  this.speed = Math.floor((Math.random() * 6)+10); //speed of barrier
  this.velocity = 0;//speed of gravity force
  this.time = 0;
  
  this.show = function() {
    fill(0,255,0);
    ellipse(this.x,this.y,50,50);
  };
  
  
  this.update = function() {
    this.x -= this.speed;
    this.velocity = 0; //air resistance
    if (this.x < 0 && this.time <= 0) {
      this.x = window.innerWidth;
      this.y = Math.floor(Math.random() * window.innerHeight);
      this.time = Math.floor((Math.random() * 6));
      }
    }
  }
}