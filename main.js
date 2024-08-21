import GameConfig from './js/GameConfig.js';

// Initialize the game configuration
const config = new GameConfig();

// Access game objects and engine through GameConfig
const player = config.getPlayer();
const platforms = config.getPlatforms();
const eventHandlers = config.getEventHandlers();
const imageLoader = config.getImageLoader();
const gameEngine = config.getGameEngine();

// Load images and start the game
imageLoader.getImages().then(() => {
  player.setImage(imageLoader.getPlayerImage());
  platforms.forEach(platform => platform.setImage(imageLoader.getPlatformImage()));

  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load images:', error);
});
