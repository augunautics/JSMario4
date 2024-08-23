import Background from './js/Background.js';
import Hills from './js/Hills.js';
import Player from './js/Player.js';
import Platform from './js/Platform.js';

import GameConfig from './js/GameConfig.js';

// Initialize the game configuration
const config = new GameConfig();

// Access game objects and engine through GameConfig
const background = config.getBackground();
const hills = config.getHills();

const player = config.getPlayer();
const platforms = config.getPlatforms();
const eventHandlers = config.getEventHandlers();
const imageLoader = config.getImageLoader();
const gameEngine = config.getGameEngine();



// Load images and start the game
imageLoader.getImages().then(() => {
  background.setImage(imageLoader.getImage(Background.imagePath));
  hills.setImage(imageLoader.getImage(Hills.imagePath));
  player.setImage(imageLoader.getImage(Player.imagePath));
  platforms.forEach(platform => platform.setImage(imageLoader.getImage(Platform.imagePath)));

  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load imageds:', error);
});
