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
  
   
  }
  