export default class GameEngine {
  constructor({ background, hill, player, platform, context, eventHandlers, canvas }) {
    this.background = background;
    this.hill = hill;
    this.player = player;
    this.platform = platform;
    this.context = context;
    this.eventHandlers = eventHandlers;
    this.canvas = canvas;

    this.scrollOffset = 0; // Initialize the scrollOffset variable

    this.animate = this.animate.bind(this);
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Set the fill color to white
    this.context.fillStyle = 'white';

    // Fill the entire canvas with the fill color (white)
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.draw();
    this.platform.draw();
    this.handleHillParallaxMovement();
    

    // Now handle player and platform movements, collisions, and rendering
    this.handlePlayerMovement();
    this.handlePlatformMovement();
    this.handleCollisionDetection();


    this.player.update();
    this.checkScrollOffset(); // Call the method to check scroll offset
  }
  handleHillParallaxMovement() {
    const isPlayerMoving = this.player.velocity.x !== 0;
    const isPlatformMoving = this.platform.velocity && this.platform.velocity.x !== 0;



    if (isPlayerMoving) {
      if (this.player.velocity.x > 0) {
        // Player is moving right, hill should move left

        this.hill.move();
      } else if (this.player.velocity.x < 0) {
        // Player is moving left, hill should move right
        this.hill.x += this.hill.speed;
      }
    } else if (isPlatformMoving) {
      const platformVelocityX = this.platform.velocity.x;

      if (platformVelocityX < 0) {
        // Platform is moving right, hill should move left
        this.hill.move();  // Hill move left
      } else if (platformVelocityX > 0) {
        // Platform is moving left, hill should move right
        this.hill.x += this.hill.speed;  // Hill move right
      }
    }

    this.hill.draw();  // Draw the hill
  }






  handlePlayerMovement() {
    const movementSpeed = 2; // Define a constant for the player's movement speed
    const rightBoundary = 400; // Define a constant for the right boundary
    const leftBoundary = 100; // Define a constant for the left boundary

    const isRightPressed = this.eventHandlers.inputState.right.pressed;
    const isLeftPressed = this.eventHandlers.inputState.left.pressed;

    const playerLeftEdge = this.player.x; // Calculate player left edge

    if (isRightPressed && playerLeftEdge < rightBoundary) {
      this.player.velocity.x = movementSpeed;
    } else if (isLeftPressed && playerLeftEdge > leftBoundary) {
      this.player.velocity.x = -movementSpeed;
    } else {
      this.player.velocity.x = 0;
    }
  }

  handlePlatformMovement() {
    const movementSpeed = 5; // Define a constant for the platform movement speed

    const isRightPressed = this.eventHandlers.inputState.right.pressed;
    const isLeftPressed = this.eventHandlers.inputState.left.pressed;

    if (isRightPressed && this.player.velocity.x === 0) {
      this.platform.velocity = { x: -movementSpeed }; // Platform moves left when player is stationary
      this.platform.x -= movementSpeed;
      this.scrollOffset += movementSpeed; // Decrease offset when moving right
    } else if (isLeftPressed && this.player.velocity.x === 0) {
      this.platform.velocity = { x: movementSpeed }; // Platform moves right when player is stationary
      this.platform.x += movementSpeed;
      this.scrollOffset -= movementSpeed; // Increase offset when moving left
    } else {
      this.platform.velocity = { x: 0 }; // No movement when player and platform are stationary
    }
  }

  handleCollisionDetection() {
    const playerBottom = this.player.y + this.player.height;
    const playerTop = this.player.y;
    const playerLeft = this.player.x;
    const playerRight = this.player.x + this.player.width;

    const platformTop = this.platform.y;
    const platformBottom = this.platform.y + this.platform.height;
    const platformLeft = this.platform.x;
    const platformRight = this.platform.x + this.platform.width;

    if (
      playerBottom <= platformTop &&
      playerBottom + this.player.velocity.y >= platformTop &&
      playerRight >= platformLeft &&
      playerLeft <= platformRight
    ) {
      this.player.y = platformTop - this.player.height;
      this.player.velocity.y = 0;
    }
  }

  // New method to check the scrollOffset and log when it exceeds 2000
  checkScrollOffset() {
    if (this.scrollOffset > 2000) {
      console.log('Scroll offset exceeded 2000:', this.scrollOffset);
    }
    if (this.scrollOffset < 0) {
      console.log('Scroll offset less than 0:', this.scrollOffset);
    }
  }

  isPlayerOnGround() {
    const playerTop = this.player.y;
    const playerBottom = this.player.y + this.player.height;
    const playerLeft = this.player.x;
    const playerRight = this.player.x + this.player.width;

    const platformTop = this.platform.y;
    const platformLeft = this.platform.x;
    const platformRight = this.platform.x + this.platform.width;

    return (
      playerBottom === platformTop &&
      playerRight > platformLeft &&
      playerLeft < platformRight
    );
  }

}
