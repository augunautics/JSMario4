import Background from './js/Background.js';
import Hill from './js/Hill.js';
import Player from './js/Player.js';
import Platform from './js/Platform.js';

import GameConfig from './js/GameConfig.js';

// Initialize the game configuration
const config = new GameConfig();

// Access game objects and engine through GameConfig
const player = config.getGameObject(Player);
const background = config.getGameObject(Background);
const hill = config.getGameObject(Hill);
const platform = config.getGameObject(Platform);

const eventHandlers = config.getEventHandlers();
const imageLoader = config.getImageLoader();
const gameEngine = config.getGameEngine();



// Load images and start the game
imageLoader.getImages().then(() => {
  background.setImage(imageLoader.getImage(Background.imagePath));
  hill.setImage(imageLoader.getImage(Hill.imagePath));
  player.setImage(imageLoader.getImage(Player.imagePath));
  platform.setImage(imageLoader.getImage(Platform.imagePath));
  

  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load imageds:', error);
});
