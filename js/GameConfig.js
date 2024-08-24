import Player from './Player.js';
import Platform from './Platform.js';
import EventHandlers from './EventHandlers.js';
import ImageLoader from './ImageLoader.js';
import GameEngine from './GameEngine.js';
import Background from './Background.js';
import Hill from './Hill.js';

export default class GameConfig {
  constructor() {
    this.init();
  }

  init() {
    // Initialize the canvas and context
    console.log('init()');
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 576;
    this.context = this.canvas.getContext('2d');

   

    // Initialize game objects
    this.background = new Background({
      width: this.canvas.width,
      height: this.canvas.height,
      context: this.context,
    });

    this.hill = new Hill({
      x: 200,
      y: 0,
      width: 1024,
      height: 176,
      context: this.context,
      image: null,
      speed: 0.5, // Slower speed for distant hill
    });

    this.player = new Player({
      x: 100,
      y: 200,
      width: 175,
      height: 200,
      velocityX: 0,
      velocityY: 1,
      context: this.context,
      canvas: this.canvas,
      gravity: 0.5,
    });

    this.platform = new Platform({
      x: 0,
      y: this.canvas.height - 125,
      width: 2000,
      height: 125,
      context: this.context,
    });

 

    // Ensure image loader is not reloading images
    if (!this.imageLoader) {
      const gameObjectsImagesToLoad = [Background, Hill, Player, Platform];
      this.imageLoader = new ImageLoader(gameObjectsImagesToLoad);
    }

    // Set the images back to the game objects
    this.setImages();
    
    const jumpCallback = () => {
      if (this.gameEngine.isPlayerOnGround()) {
        this.player.velocity.y -= 20;
      }
    };
    
    const stopJumpCallback = () => {
      this.player.velocity.y = 0;
    };

    if (!this.eventHandlers) {
      this.eventHandlers = new EventHandlers({
        onJump: jumpCallback,
        onStopJump: stopJumpCallback,
      });
      
    }

    // Initialize the game engine
    this.gameEngine = new GameEngine({
      background: this.background,
      hill: this.hill,
      player: this.player,
      platform: this.platform,
      context: this.context,
      eventHandlers: this.eventHandlers,
      canvas: this.canvas,
      config: this,
    });

    
  }

  setImages() {
    return this.imageLoader.getImages().then(() => {  // Ensure to return the promise here
      this.background.setImage(this.imageLoader.getImage(Background.name));
      this.hill.setImage(this.imageLoader.getImage(Hill.name));
      this.player.setImage(this.imageLoader.getImage(Player.name));
      this.platform.setImage(this.imageLoader.getImage(Platform.name));
    });
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
