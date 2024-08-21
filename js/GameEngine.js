//save
export default class GameEngine {
  constructor({ player, platforms, context, eventHandlers, canvas }) {
    this.player = player;
    this.platforms = platforms;
    this.context = context;
    this.eventHandlers = eventHandlers;
    this.canvas = canvas;

    this.scrollOffset = 0; // Initialize the scrollOffset variable

    this.animate = this.animate.bind(this);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.platforms.forEach((platform) => {
      this.handlePlayerMovement(platform);
      this.handlePlatformMovement(platform);
      this.handleCollisionDetection(platform);

      platform.draw();
    });

    this.player.update();
    this.checkScrollOffset(); // Call the method to check scroll offset
  }

  get isRightPressed() {
    return this.eventHandlers.inputState.right.pressed;
  }

  get isLeftPressed() {
    return this.eventHandlers.inputState.left.pressed;
  }

  get playerRightEdge() {
    return this.player.position.x + this.player.width;
  }

  get playerLeftEdge() {
    return this.player.position.x;
  }

  setPlayerHorizontalVelocity(value) {
    this.player.velocity.x = value;
  }

  setPlayerVerticalVelocity(value) {
    this.player.velocity.y = value;
  }

  handlePlayerMovement(platform) {
    if (this.isRightPressed && this.playerLeftEdge < 400) {
      this.setPlayerHorizontalVelocity(5);
    } else if (this.isLeftPressed && this.playerLeftEdge > 100) {
      this.setPlayerHorizontalVelocity(-5);
    } else {
      this.setPlayerHorizontalVelocity(0);
    }
  }

  handlePlatformMovement(platform) {
    if (this.isRightPressed && this.player.velocity.x === 0) {
      platform.position.x -= 5;
      this.scrollOffset += 5; // Decrease offset when moving right
    } else if (this.isLeftPressed && this.player.velocity.x === 0) {
      platform.position.x += 5;
      this.scrollOffset -= 5; // Increase offset when moving left
    }
    
  }

  handleCollisionDetection(platform) {
    if (
      this.player.playerBottom <= platform.platformTop &&
      this.player.playerBottomWithVelocity >= platform.platformTop &&
      this.playerRightEdge >= platform.platformLeft &&
      this.player.position.x <= platform.platformRight
    ) {
      this.setPlayerVerticalVelocity(0);
    }
  }

  // New method to check the scrollOffset and log when it exceeds 2000
  checkScrollOffset() {
    if (this.scrollOffset > 2000) {
      console.log('Scroll offset exceeded 2000:', this.scrollOffset);
    }
    if (this.scrollOffset < 0) {
      console.log('Scroll offset less than  0:', this.scrollOffset);
    }
  }
}
