// js/GameObject.js

export default class GameObject {
    constructor({ x, y, width, height, context, image = null }) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.context = context;
      this.image = image;
    }
  
    setImage(image) {
      this.image = image;
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
    }s
  }
  