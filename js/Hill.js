import GameObject from './GameObject.js';

export default class Hill extends GameObject {
  static imagePath = './img/hill.png';

  constructor({ x, y, width, height, context, image, speed }) {
    super({ x, y, width, height, context, image });
    this.speed = speed;
    this.type = 'parallax'; // Tag this as a parallax object
  }

  move() {
    // Move the hill based on the speed, slower than the player's speed
    this.x -= this.speed;

    // If the hill have scrolled off the screen, reset their position to loop
    if (this.x <= -this.width) {
      this.x = 0;
    }
  }

  draw() {
    // Draw the hill twice to create a continuous loop effect
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}
