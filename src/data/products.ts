export interface Product {
  id: string;
  name: string;
  cat: string;
  price: number;
  img: string;
  gallery: string[];
  desc: string;
}

export const products: Product[] = [
  {
    id: 'signature-tee',
    name: 'DN8 Signature Tee',
    cat: 'Polo',
    price: 42,
    img: '/assets/polo-white-front.jpg',
    gallery: ['/assets/polo-white-front.jpg', '/assets/polo-white-back.jpg'],
    desc: 'Our cornerstone piece. Premium cotton piqué with a tonal DN8 mark and embroidered crest. Cut clean, built to be worn every single day.',
  },
  {
    id: 'winner-tee',
    name: 'Style of a Winner Tee',
    cat: 'Polo',
    price: 45,
    img: '/assets/polo-stadium.jpg',
    gallery: ['/assets/polo-stadium.jpg'],
    desc: 'A performance polo built for the podium. Structured collar, knit jacquard sleeve detail, and a fit that moves the moment you do.',
  },
  {
    id: 'all-eyes-tee',
    name: 'All Eyes Tee',
    cat: 'Tees',
    price: 48,
    img: '/assets/tee-alleyes.jpg',
    gallery: ['/assets/tee-alleyes.jpg'],
    desc: 'Oversized statement tee in heavyweight jersey with a bold back graphic. Designed to be seen — and remembered.',
  },
  {
    id: 'winner-hoodie',
    name: 'Winner Hoodie',
    cat: 'Fleece',
    price: 89,
    img: '/assets/hoodie-white.jpg',
    gallery: ['/assets/hoodie-white.jpg'],
    desc: 'Heavyweight fleece hoodie with embroidered crest and a signature patterned lining. Warmth, structure, and quiet authority.',
  },
  {
    id: 'essential-sweat',
    name: 'Essential Sweatshirt',
    cat: 'Fleece',
    price: 72,
    img: '/assets/crop-beige.jpg',
    gallery: ['/assets/crop-beige.jpg'],
    desc: 'Soft brushed-back fleece in a refined silhouette. The everyday layer for the off-duty winner.',
  },
  {
    id: 'training-pants',
    name: 'Training Pants',
    cat: 'Bottoms',
    price: 68,
    img: '/assets/pants-black.jpg',
    gallery: ['/assets/pants-black.jpg'],
    desc: "Tapered tech-fleece pants with zip pockets and 'Born to Win' embroidery. Engineered for training and the street alike.",
  },
  {
    id: 'zip-hoodie',
    name: 'DN8 Zip Hoodie',
    cat: 'Fleece',
    price: 98,
    img: '/assets/zip-grey.jpg',
    gallery: ['/assets/zip-grey.jpg'],
    desc: 'Oversized full-zip hoodie in brushed cotton. Relaxed, layered, and built for movement from warm-up to wind-down.',
  },
];
