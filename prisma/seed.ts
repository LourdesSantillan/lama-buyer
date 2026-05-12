import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productos = [
  {
    titulo: 'Vintage Leather Jacket',
    descripcion: 'Classic brown leather jacket from the 80s',
    precio: 45.99,
    imagenUrl: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400',
    categoria: 'Outerwear',
    talle: 'M',
    marca: 'Levi\'s',
    estado: 'excelente',
    stock: 2,
    vendedorId: 'seller_1',
  },
  {
    titulo: 'High-Waist Denim Jeans',
    descripcion: '90s style high-waist jeans, perfect condition',
    precio: 28.50,
    imagenUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400',
    categoria: 'Pants',
    talle: 'S',
    marca: 'Lee',
    estado: 'buen estado',
    stock: 5,
    vendedorId: 'seller_2',
  },
  {
    titulo: 'Retro Band T-Shirt',
    descripcion: 'Original 1995 Nirvana concert tee',
    precio: 35.00,
    imagenUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    categoria: 'Tops',
    talle: 'M',
    marca: 'Vintage',
    estado: 'regular',
    stock: 1,
    vendedorId: 'seller_3',
  },
  {
    titulo: 'Floral Midi Dress',
    descripcion: 'Beautiful 70s floral print dress',
    precio: 32.00,
    imagenUrl: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400',
    categoria: 'Dresses',
    talle: 'S',
    marca: 'Unknown',
    estado: 'buen estado',
    stock: 3,
    vendedorId: 'seller_1',
  },
  {
    titulo: 'Cashmere Cardigan',
    descripcion: 'Soft cream cashmere cardigan',
    precio: 52.99,
    imagenUrl: 'https://images.unsplash.com/photo-1551234437-b78e2b590f40?w=400',
    categoria: 'Knitwear',
    talle: 'M',
    marca: 'Burberry',
    estado: 'excelente',
    stock: 1,
    vendedorId: 'seller_2',
  },
  {
    titulo: 'Oversized Blazer',
    descripcion: 'Navy oversized blazer, great for layering',
    precio: 42.00,
    imagenUrl: 'https://images.unsplash.com/photo-1505886711901-75a568318738?w=400',
    categoria: 'Outerwear',
    talle: 'L',
    marca: 'H&M Vintage',
    estado: 'buen estado',
    stock: 2,
    vendedorId: 'seller_3',
  },
  {
    titulo: 'Silk Slip Skirt',
    descripcion: 'Emerald green silk slip skirt',
    precio: 24.99,
    imagenUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    categoria: 'Skirts',
    talle: 'XS',
    marca: 'Zara Vintage',
    estado: 'excelente',
    stock: 1,
    vendedorId: 'seller_1',
  },
  {
    titulo: 'White Sneakers',
    descripcion: 'Classic white leather sneakers',
    precio: 38.50,
    imagenUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
    categoria: 'Shoes',
    talle: 'M',
    marca: 'Adidas',
    estado: 'buen estado',
    stock: 3,
    vendedorId: 'seller_2',
  },
  {
    titulo: 'Polka Dot Blouse',
    descripcion: 'Red and white polka dot blouse, 80s style',
    precio: 20.00,
    imagenUrl: 'https://images.unsplash.com/photo-1617022260166-7c1a0a70a8c5?w=400',
    categoria: 'Tops',
    talle: 'S',
    marca: 'Vintage',
    estado: 'regular',
    stock: 2,
    vendedorId: 'seller_3',
  },
  {
    titulo: 'Wool Peacoat',
    descripcion: 'Charcoal wool peacoat, perfect for winter',
    precio: 55.00,
    imagenUrl: 'https://images.unsplash.com/photo-1539533057440-7cf90b2bbb28?w=400',
    categoria: 'Outerwear',
    talle: 'M',
    marca: 'Tommy Hilfiger',
    estado: 'excelente',
    stock: 1,
    vendedorId: 'seller_1',
  },
];

async function main() {
  console.log('Seeding database...');

  for (const producto of productos) {
    await prisma.producto.create({
      data: producto,
    });
  }

  console.log('✓ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });