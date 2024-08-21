// GameConfig.js

import Player from './Player.js';
import Platform from './Platform.js';
import EventHandlers from './EventHandlers.js';
import ImageLoader from './ImageLoader.js';
import GameEngine from './GameEngine.js';

export default class GameConfig {
  constructor() {
    // Initialize the canvas and context
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');

    // Initialize the player
    this.player = new Player({
      x: 100,
      y: 800,
      width: 30,
      height: 30,
      velocityX: 0,
      velocityY: 1,
      context: this.context,
      canvas: this.canvas,
      gravity: 0.5,
    });

    // Initialize the platforms
    this.platforms = [
      new Platform({ x: 300, y: 700, width: 200, height: 20, context: this.context }),
      new Platform({ x: 600, y: 500, width: 200, height: 20, context: this.context }),
    ];

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
