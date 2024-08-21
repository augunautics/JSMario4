//save
export default class Platform {
  constructor({ x, y, width, height, context, image = null }) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.context = context; // Store context as a class property
    this.image = image; // Store the image property
  }

  setImage(image) {
    this.image = image; // Method to set the image after the platform is instantiated
  }

  get platformTop() {
    return this.position.y;
  }

  get platformLeft() {
    return this.position.x;
  }

  get platformRight() {
    return this.position.x + this.width;
  }

  draw() {
    if (this.image) {
      // If an image is provided, draw the image
      this.context.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      // If no image is provided, draw a blue rectangle
      this.context.fillStyle = 'blue';
      this.context.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }
}
