import Player from './Player.js';
import Platform from './Platform.js';
import EventHandlers from './EventHandlers.js';
import ImageLoader from './ImageLoader.js';
import GameEngine from './GameEngine.js';

export default class GameConfig {
  constructor() {
    // Initialize the canvas and context
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 576;
    this.context = this.canvas.getContext('2d');

    // Platform 1 values
    const platform1X = 100;
    const platform1Y = 451;
    const platform1Width = 200;
    const platform1Height = 20;

    // Platform 2 values
    const platform2X = 600;
    const platform2Y = 200;
    const platform2Width = 100;
    const platform2Height = 20;

    // Initialize the platforms using the defined values
    this.platforms = [
      new Platform({
        x: platform1X,
        y: platform1Y,
        width: platform1Width,
        height: platform1Height,
        context: this.context
      }),
      new Platform({
        x: platform2X,
        y: platform2Y,
        width: platform2Width,
        height: platform2Height,
        context: this.context
      }),
    ];

    // Initialize the player
    this.player = new Player({
      x: 100,
      y: 0,
      width: 30,
      height: 30,
      velocityX: 0,
      velocityY: 1,
      context: this.context,
      canvas: this.canvas,
      gravity: 0.5,
    });

    // Initialize event handlers
    this.eventHandlers = new EventHandlers(this.player);

    // Initialize the image loader
    this.imageLoader = new ImageLoader({
      player: './img/player.png',
      platform: './img/platform.png',
    });

    // Initialize the game engine
    this.gameEngine = new GameEngine({
      player: this.player,
      platforms: this.platforms,
      context: this.context,
      eventHandlers: this.eventHandlers,
      canvas: this.canvas,
    });
  }

  // Method to get the player
  getPlayer() {
    return this.player;
  }

  // Method to get the platforms
  getPlatforms() {
    return this.platforms;
  }

  // Method to get the event handlers
  getEventHandlers() {
    return this.eventHandlers;
  }

  // Method to get the image loader
  getImageLoader() {
    return this.imageLoader;
  }

  // Method to get the canvas
  getCanvas() {
    return this.canvas;
  }

  // Method to get the context
  getContext() {
    return this.context;
  }

  // Method to get the game engine
  getGameEngine() {
    return this.gameEngine;
  }

  // Method to get the config itself (for flexibility)
  getConfig() {
    return this;
  }
}
