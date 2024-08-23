export default class ImageLoader {
    constructor(classes) {
      this.images = {};
      this.loadPromise = this.loadAll(classes);  // Automatically start loading images
    }
  
    loadAll(classes) {
      const promises = classes.map(cls => this.loadImage(cls.imagePath, cls.name.toLowerCase()));
      return Promise.all(promises);
    }
  
    loadImage(url, key) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.images[key] = img;  // Store the loaded image by class name key (e.g., 'player')
          this.images[url.toLowerCase()] = img;  // Also store by the full filename (e.g., 'player.png')
          console.log(`${key} image loaded with dimensions: ${img.width}x${img.height}`);
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error(`Failed to load image at ${url}`));
        };
        img.src = url;
      });
    }
  
    getImage(name) {
      const key = name.toLowerCase().replace('.png', '');  // Handle key without .png extension
      return this.images[key] || this.images[name.toLowerCase()];
    }
  
    getImages() {
      return this.loadPromise;
    }
    

    
  }
  