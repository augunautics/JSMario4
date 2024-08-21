import Player from './js/Player.js';
import Platform from './js/Platform.js';
import GameEngine from './js/GameEngine.js';
import EventHandlers from './js/EventHandlers.js';
import ImageLoader from './js/ImageLoader.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');

const gravity = 0.5;

const imageLoader = new ImageLoader({
  player: './img/player.png',
  platform: './img/platform.png'
});

const player = new Player({
  x: 100,
  y: 800,
  width: 30,
  height: 30,
  velocityX: 0,
  velocityY: 1,
  context: context,
  canvas: canvas,
  gravity: gravity,
});

// Create an array to hold platforms
const platforms = [];

// Create platform1 and add it to the platforms array
const platform1 = new Platform({
  x: 300,
  y: 700,
  width: 200,
  height: 20,
  context: context,
});

platforms.push(platform1);

// Create platform2 with different x and y positions but same width and height
const platform2 = new Platform({
  x: 600, // Different x position
  y: 500, // Different y position
  width: 200,
  height: 20,
  context: context,
});

platforms.push(platform2);

const eventHandlers = new EventHandlers(player);
// Initialize the animation
const gameEngine = new GameEngine({
  player: player,
  platforms: platforms,
  context: context,
  eventHandlers: eventHandlers,
  canvas: canvas, // Pass the canvas to the gameEngine class
});


imageLoader.getImages().then(() => {
  player.setImage(imageLoader.getPlayerImage());

  // Loop through each platform and set the image
  for (const platform of platforms) {
    platform.setImage(imageLoader.getPlatformImage());
  }
  // After setting the images, setup event listeners and start the animation
  eventHandlers.setupListeners();
  gameEngine.animate(); // Start the animation loop
}).catch(error => {
  console.error('Failed to load images:', error);
});
