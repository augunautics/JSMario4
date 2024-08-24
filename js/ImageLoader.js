export default class ImageLoader {
  constructor(gameObjectsImagesToLoad) {
    this.images = {};
    this.loadPromise = this.loadAllSprites(gameObjectsImagesToLoad);  // Automatically start loading images
  }

  loadAllSprites(gameObjectsImagesToLoad) {
    const promises = gameObjectsImagesToLoad.map(gameObject => this.loadImage(gameObject.imagePath, gameObject.name.toLowerCase()));
    return Promise.all(promises);
  }

  loadImage(url, key) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images[key] = img;  // Store the loaded image by class name key (e.g., 'player')
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error(`Failed to load image at ${url}`));
      };
      img.src = url;
    });
  }

  getImage(name) {
    const key = name.toLowerCase();
    return this.images[key] || this.images[name.toLowerCase()];
  }

  getImages() {
    return this.loadPromise;
  }
}
