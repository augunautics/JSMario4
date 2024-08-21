import GameConfig from './js/GameConfig.js';

const config = new GameConfig();

// Access the game objects and engine through GameConfig
const player = config.getPlayer();
const platforms = config.getPlatforms();
const eventHandlers = config.getEventHandlers();
const imageLoader = config.getImageLoader();
const gameEngine = config.getGameEngine();

// Load images and start the game once they are ready
imageLoader.getImages().then(() => {
  const platformImage = imageLoader.getPlatformImage();

  // Set platform dimensions based on the loaded image
  platforms.forEach(platform => {
    platform.width = platformImage.width;
    platform.height = platformImage.height;
    platform.setImage(platformImage);
  });

  // Set the player image
  player.setImage(imageLoader.getPlayerImage());

  // Setup event handlers and start the game
  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load images:', error);
});
