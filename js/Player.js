import GameObject from './GameObject.js';

export default class Player extends GameObject {
  constructor({ x, y, width, height, velocityX, velocityY, context, canvas, gravity, image = null }) {
    super({ x, y, width, height, context, image }); // Call the GameObject constructor
    this.velocity = { x: velocityX, y: velocityY };
    this.canvas = canvas; // Store canvas as a class property
    this.gravity = gravity;
  }

  get bottom() {
    return this.y + this.height;
  }

  get bottomWithVelocity() {
    return this.y + this.height + this.velocity.y;
  }

  get right() {
    return this.x + this.width;
  }

  get left() {
    return this.x;
  }

  get top() {
    return this.y;
  }

  update() {
    this.draw(); // Draw the player
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Apply gravity only if the player is not touching the bottom of the canvas
    if (this.bottomWithVelocity <= this.canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }

  draw() {
    if (this.image) {
      const sourceX = 0;
      const sourceY = 0;
      const sourceWidth = this.width;  // Use width directly
      const sourceHeight = this.image.height;

      const destinationWidth = this.width;  // Use width directly
      const destinationHeight = this.height;

      this.context.drawImage(
        this.image,
        sourceX, sourceY, sourceWidth, sourceHeight,
        this.x, this.y, destinationWidth, destinationHeight
      );
    } else {
      this.context.fillStyle = 'blue';
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
