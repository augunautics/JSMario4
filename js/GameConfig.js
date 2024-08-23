import Player from './Player.js';
import Platform from './Platform.js';
import EventHandlers from './EventHandlers.js';
import ImageLoader from './ImageLoader.js';
import GameEngine from './GameEngine.js';
import Background from './Background.js';
import Hill from './Hill.js';

export default class GameConfig {
  constructor() {
    // Initialize the canvas and context
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 576;
    this.context = this.canvas.getContext('2d');

    // Map to hold all game objects
    this.gameObject = new Map();

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
      speed: 0.5 // Slower speed for distant hill
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

    this.platform =  new Platform({
        x: 0,  // Start at the left edge of the canvas
        y: this.canvas.height - 125,  // Positioned at the bottom of the canvas
        width: 2000,  // Extend the full width of the canvas
        height: 125,  // Height of the ground section
        context: this.context
      });


    // Add game objects to the map
    this.gameObject.set(Background, this.background);
    this.gameObject.set(Hill, this.hill);
    this.gameObject.set(Player, this.player);
    this.gameObject.set(Platform, this.platform);

    // Initialize the game engine first
    this.gameEngine = new GameEngine({
      background: this.background,
      hill: this.hill,
      player: this.player,
      platform: this.platform,
      context: this.context,
      eventHandlers: null, // Set to null initially
      canvas: this.canvas,
    });

    // Initialize event handlers with the game engine
    this.eventHandlers = new EventHandlers(this.player, this.gameEngine);

    // Update the game engine with the event handlers
    this.gameEngine.eventHandlers = this.eventHandlers;

    // Initialize the image loader
    const classesToLoad = [Background, Hill, Player, Platform ];
    this.imageLoader = new ImageLoader(classesToLoad);
  }

  // Method to get any game object by class
  getGameObject(cls) {
    return this.gameObject.get(cls);
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
