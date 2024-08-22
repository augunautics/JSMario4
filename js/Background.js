import GameObject from './GameObject.js';

export default class Background extends GameObject {
  constructor({ x = 0, y = 0, width, height, context, image = null }) {
    super({ x, y, width, height, context, image });
  }

  draw() {
    if (this.image) {
      this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      console.error('Background image is not set.');
    }
  }
}
