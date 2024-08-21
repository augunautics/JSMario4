// EventHandlers.js
//save
export default class EventHandlers {
  constructor(player) {
    this.player = player;

    this.inputState = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };
  }

  setupListeners() {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'd':
      case 'D':
        this.inputState.right.pressed = true;
        break;
      case 'a':
      case 'A':
        this.inputState.left.pressed = true;
        break;
      case 's':
      case 'S':
        this.player.velocity.y += 10;
        break;
      case 'w':
      case 'W':
        this.player.velocity.y -= 20;
        break;
    }
  }

  handleKeyup(event) {
    switch (event.key) {
      case 'd':
      case 'D':
        this.inputState.right.pressed = false;
        break;
      case 'a':
      case 'A':
        this.inputState.left.pressed = false;
        break;
      case 's':
      case 'S':
      case 'w':
      case 'W':
        this.player.velocity.y = 0;
        break;
    }
  }
}
