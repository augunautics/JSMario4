export default class ImageLoader {
    constructor(imageUrls) {
        this.imageUrls = imageUrls;
        this.images = {};
        this.loadPromise = this.loadAll();  // Automatically start loading images
    }

    loadAll() {
        const promises = Object.keys(this.imageUrls).map(key => this.loadImage(key, this.imageUrls[key]));
        return Promise.all(promises);
    }

    loadImage(key, url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[key] = img;
                resolve(img);
            };
            img.onerror = () => {
                reject(new Error(`Failed to load image at ${url}`));
            };
            img.src = url;
        });
    }

    getImages() {
        return this.loadPromise;
    }

    getPlayerImage() {
        return this.images.player;
    }

    getPlatformImage() {
        return this.images.platform;
    }
}
