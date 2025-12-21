const IMAGES_BASE_PATH = 'assets/images';
const VIDEOS_BASE_PATH = 'assets/videos';

export const ASSETS_PATHS = {
  videos: {
    heroLoop: `${VIDEOS_BASE_PATH}/loop.mp4`,
  },
  images: {
    hero: {
      hero1: `${IMAGES_BASE_PATH}/hero1.jpg`,
    },
    sudadera: {
      sudadera1: `${IMAGES_BASE_PATH}/sudadera1.jpg`,
    },
  },
} as const;

