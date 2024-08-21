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
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.context.fillStyle = 'gray'; // Default color if no image is provided
        this.context.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }
  