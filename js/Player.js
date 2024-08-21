//save
export default class Player {
  constructor({
    x,
    y,
    width,
    height,
    velocityX,
    velocityY,
    context,
    canvas,
    gravity,
    image = null, // Add image as an optional property
  }) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.velocity = { x: velocityX, y: velocityY };
    this.context = context; // Store context as a class property
    this.canvas = canvas; // Store canvas as a class property
    this.gravity = gravity;
    this.image = image; // Store the image property
  }

  setImage(image) {
    this.image = image; // Method to set the image after the player is instantiated
  }

  get playerBottom() {
    return this.position.y + this.height;
  }

  get playerBottomWithVelocity() {
    return this.position.y + this.height + this.velocity.y;
  }

  get playerRightSide() {
    return this.position.x + this.width;
  }

  get playerLeftSide() {
    return this.position.x;
  }

  draw() {
    if (this.image) {
      this.context.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      // Fallback to a red rectangle if no image is provided
      this.context.fillStyle = 'red';
      this.context.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Apply gravity only if the player is not touching the bottom of the canvas
    if (this.playerBottomWithVelocity <= this.canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
