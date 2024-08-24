export default class EventHandlers {
  constructor({ onJump, onStopJump }) {
    this.onJump = onJump;
    this.onStopJump = onStopJump;

    this.boundHandleKeydown = this.handleKeydown.bind(this);
    this.boundHandleKeyup = this.handleKeyup.bind(this);

    this.inputState = {
      right: { pressed: false },
      left: { pressed: false },
    };
  }

  setupListeners() {
    window.addEventListener('keydown', this.boundHandleKeydown);
    window.addEventListener('keyup', this.boundHandleKeyup);
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
      case 'w':
      case 'W':
        this.onJump();  // Call the jump callback
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
      case 'w':
      case 'W':
        this.onStopJump();  // Call the stop jump callback
        break;
    }
  }
}
