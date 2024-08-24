import GameObject from './GameObject.js';

export default class Platform extends GameObject {
  static imagePath = './img/platform.png';
  draw() {
    if (this.image) {
      // Define the section of the image to repeat
      const sourceX = 0;
      const sourceY = 0;
      const sourceWidth = 74;  // Width of the section to repeat
      const sourceHeight = this.image.height; // Height of the section to repeat

      // Calculate how many times the section needs to be repeated to cover the platform
      const repeatCount = Math.ceil(this.width / sourceWidth);

      for (let i = 0; i < repeatCount; i++) {
        const destX = this.x + i * sourceWidth;

        // Draw with a slight overlap to avoid gaps
        this.context.drawImage(
          this.image,
          sourceX, sourceY, sourceWidth, sourceHeight,  // Source: crop the section
          destX, this.y, sourceWidth + 1, this.height  // Destination: draw with slight overlap
        );
      }
    } else {
      // Fallback if image is not set
      this.context.fillStyle = 'green';
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
