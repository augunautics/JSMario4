import Background from './js/Background.js';
import Hill from './js/Hill.js';
import Player from './js/Player.js';
import Platform from './js/Platform.js';
import GameConfig from './js/GameConfig.js';

// Initialize the game configuration
const config = new GameConfig();

// Access game objects and engine through GameConfig
const eventHandlers = config.getEventHandlers();
const gameEngine = config.getGameEngine();

// Load images and start the game
config.setImages().then(() => {
  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load images:', error);
});
