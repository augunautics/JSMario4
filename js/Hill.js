import GameObject from './GameObject.js';

export default class Hill extends GameObject {
  static imagePath = './img/hill.png';

  constructor({ context, image, x = 200, y = 375 }) {
    super({ context, image });
    this.x = x;  // Initial x position of the hill
    this.y = y;  // Fixed y position of the hill
  }

  draw() {
    if (this.image) {
      const cropX = 0;             // Start cropping from the leftmost part of the image
      const cropY = 135;           // Start cropping from the topmost part of the image
      const cropWidth = 510;       // Width of the cropping area
      const cropHeight = 300;      // Height of the cropping area

      const drawX = this.x;        // Use the hill's updated X coordinate for drawing
      const drawY = this.y;        // Y coordinate on the canvas
      const drawWidth = cropWidth; // Width of the drawn image on the canvas
      const drawHeight = cropHeight; // Height of the drawn image on the canvas

      // Draw the cropped image at the specified coordinates on the canvas
      this.context.drawImage(
        this.image,
        cropX, cropY, cropWidth, cropHeight,  // Crop the image
        drawX, drawY, drawWidth, drawHeight   // Draw the image at the updated position
      );
    }
  }
}
