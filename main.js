import Background from './js/Background.js';
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
  background.setImage(imageLoader.getBackgroundImage());
  hills.setImage(imageLoader.getHillsImage());
  player.setImage(imageLoader.getPlayerImage());
  platforms.forEach(platform => platform.setImage(imageLoader.getPlatformImage()));

  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load imageds:', error);
});
