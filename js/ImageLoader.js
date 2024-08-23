//save
export default class ImageLoader {
  constructor({hills, background, player, platform }) {
      this.imageUrls = { background, hills, player, platform };
      this.images = {};
      this.loadPromise = this.loadAll();  // Automatically start loading images
  }

  loadAll() {
      const promises = Object.keys(this.imageUrls).map(key => this.loadImage(this.imageUrls[key], key));
      return Promise.all(promises);
  }

  loadImage(url, key) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
              this.images[key] = img;  // Store the loaded image by its key (player or platform)
              console.log(`Platform image dimensions: ${img.width}x${img.height}`);
              resolve(img);
          };
          img.onerror = () => {
              reject(new Error(`Failed to load image at ${url}`));
          };
          img.src = url;
      });
  }

  getPlayerImage() {
      return this.images.player;
  }

  getPlatformImage() {
      return this.images.platform;
  }

  getBackgroundImage() {
    return  this.images.background;
  }

  getHillsImage() {
    return this.images.hills;
  }

  getImages() {
      return this.loadPromise;
  }
}
