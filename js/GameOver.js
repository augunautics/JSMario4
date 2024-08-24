export default class GameOver {
    constructor({ context, canvas }) {
      this.context = context;
      this.canvas = canvas;
      this.message = "Game Over";
      this.font = "bold 72px Arial";  // Customize your font and size here
      this.textColor = "white";
      this.backgroundColor = "black";
    }
  
    draw() {
      // Fill the background with black
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Set the font and text color
      this.context.font = this.font;
      this.context.fillStyle = this.textColor;
  
      // Calculate the position to center the text
      const textWidth = this.context.measureText(this.message).width;
      const textX = (this.canvas.width - textWidth) / 2;
      const textY = this.canvas.height / 2;
  
      // Draw the text
      this.context.fillText(this.message, textX, textY);
    }
  } 
  