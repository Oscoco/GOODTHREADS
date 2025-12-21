const IMAGES_BASE_PATH = 'assets/images';
const VIDEOS_BASE_PATH = 'assets/videos';
const ANIMES_PATH = 'assets/anime';

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
    categorias: {
      deportes: `${IMAGES_BASE_PATH}/deportes.jpg`,
    },
  },
  anime: {
    jujutsu: `${ANIMES_PATH}/jujutsu.png`,
    dandadan: `${ANIMES_PATH}/dandadan.webp`,
    invincible: `${ANIMES_PATH}/invencible.jpeg`,
    onepiece: `${ANIMES_PATH}/one.jpeg`,
    naruto: `${ANIMES_PATH}/naruto.jpg`,
    deportes: `${ANIMES_PATH}/deportes.jpg`,
  },
} as const;

