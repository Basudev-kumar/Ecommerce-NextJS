const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const products = [
  {
    id: 'prod_001',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    description:
      'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    inventory: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_002',
    name: 'Smart Watch',
    slug: 'smart-watch',
    description:
      'Feature-rich smartwatch with health tracking, GPS, and water resistance.',
    price: 299.99,
    category: 'Electronics',
    inventory: 23,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_003',
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    description:
      'Ergonomic aluminum laptop stand with adjustable height and angle.',
    price: 49.99,
    category: 'Accessories',
    inventory: 78,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_004',
    name: 'USB-C Hub',
    slug: 'usb-c-hub',
    description:
      '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
    price: 39.99,
    category: 'Accessories',
    inventory: 120,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_005',
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    description:
      'RGB mechanical keyboard with cherry MX switches and programmable keys.',
    price: 149.99,
    category: 'Electronics',
    inventory: 8,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_006',
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    description:
      'Ergonomic wireless mouse with precision tracking and long battery life.',
    price: 29.99,
    category: 'Accessories',
    inventory: 0,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_007',
    name: '4K Monitor',
    slug: '4k-monitor',
    description: '27-inch 4K IPS monitor with HDR support and USB-C connectivity.',
    price: 499.99,
    category: 'Electronics',
    inventory: 15,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_008',
    name: 'Desk Lamp',
    slug: 'desk-lamp',
    description:
      'LED desk lamp with adjustable brightness and color temperature.',
    price: 34.99,
    category: 'Furniture',
    inventory: 56,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_009',
    name: 'Office Chair',
    slug: 'office-chair',
    description:
      'Ergonomic office chair with lumbar support and adjustable armrests.',
    price: 249.99,
    category: 'Furniture',
    inventory: 12,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_010',
    name: 'Webcam HD',
    slug: 'webcam-hd',
    description:
      '1080p webcam with auto-focus and built-in microphone.',
    price: 79.99,
    category: 'Electronics',
    inventory: 34,
    image: 'https://images.unsplash.com/photo-1635514569146-9a9607ecf303?q=80&w=500&auto=format',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_011',
    name: 'Phone Stand',
    slug: 'phone-stand',
    description: 'Adjustable phone stand compatible with all smartphones.',
    price: 15.99,
    category: 'Accessories',
    inventory: 89,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'prod_012',
    name: 'Tablet 10 inch',
    slug: 'tablet-10-inch',
    description: '10-inch tablet with 128GB storage and stylus support.',
    price: 399.99,
    category: 'Electronics',
    inventory: 7,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop',
    lastUpdated: new Date().toISOString(),
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecommerce');
    const collection = db.collection('products');

    // Clear existing products
    await collection.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await collection.insertMany(products);
    console.log(`Inserted ${result.insertedCount} products`);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();