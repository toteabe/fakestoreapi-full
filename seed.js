const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const User = require('./model/user');
const Product = require('./model/product');
const Cart = require('./model/cart');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const users = [
  {
    id: 1,
    email: 'ana.rios@example.com',
    username: 'anarios',
    password: 'secret123',
    name: {
      firstname: 'Ana',
      lastname: 'Rios'
    },
    address: {
      city: 'Madrid',
      street: 'Gran Via',
      number: 28,
      zipcode: '28013',
      geolocation: {
        lat: '40.4200',
        long: '-3.7058'
      }
    },
    phone: '+34-600-111-222'
  },
  {
    id: 2,
    email: 'carlos.suarez@example.com',
    username: 'csuarez',
    password: 'password456',
    name: {
      firstname: 'Carlos',
      lastname: 'Suarez'
    },
    address: {
      city: 'Buenos Aires',
      street: 'Corrientes',
      number: 1350,
      zipcode: 'C1043AAQ',
      geolocation: {
        lat: '-34.6037',
        long: '-58.3816'
      }
    },
    phone: '+54-11-5555-7777'
  },
  {
    id: 3,
    email: 'luisa.torres@example.com',
    username: 'luisatorres',
    password: 'test789',
    name: {
      firstname: 'Luisa',
      lastname: 'Torres'
    },
    address: {
      city: 'Bogota',
      street: 'Cra 7',
      number: 92,
      zipcode: '110111',
      geolocation: {
        lat: '4.7110',
        long: '-74.0721'
      }
    },
    phone: '+57-310-222-3344'
  }
];

const products = [
  {
    id: 1,
    title: 'Classic White T-Shirt',
    price: 19.99,
    description: 'Cotton t-shirt for daily wear.',
    image: 'https://example.com/images/white-shirt.jpg',
    category: 'clothing'
  },
  {
    id: 2,
    title: 'Wireless Headphones',
    price: 89.5,
    description: 'Bluetooth headphones with noise isolation.',
    image: 'https://example.com/images/headphones.jpg',
    category: 'electronics'
  },
  {
    id: 3,
    title: 'Leather Wallet',
    price: 34.0,
    description: 'Slim leather wallet with card slots.',
    image: 'https://example.com/images/wallet.jpg',
    category: 'accessories'
  },
  {
    id: 4,
    title: 'Stainless Steel Bottle',
    price: 24.75,
    description: 'Reusable bottle, 750ml.',
    image: 'https://example.com/images/bottle.jpg',
    category: 'home'
  }
];

const carts = [
  {
    id: 1,
    userId: 1,
    date: new Date('2026-03-10T09:00:00.000Z'),
    products: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 }
    ]
  },
  {
    id: 2,
    userId: 2,
    date: new Date('2026-03-11T15:30:00.000Z'),
    products: [
      { productId: 2, quantity: 1 },
      { productId: 4, quantity: 3 }
    ]
  },
  {
    id: 3,
    userId: 3,
    date: new Date('2026-03-12T11:45:00.000Z'),
    products: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 2 }
    ]
  }
];

async function seedDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no esta definido en .env');
  }

  mongoose.set('useFindAndModify', false);
  mongoose.set('useUnifiedTopology', true);

  await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

  await Promise.all([
    Cart.deleteMany({}),
    Product.deleteMany({}),
    User.deleteMany({})
  ]);

  await User.insertMany(users);
  await Product.insertMany(products);
  await Cart.insertMany(carts);

  console.log('Seed completado: users, products y carts insertados correctamente.');
}

seedDatabase()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Error al ejecutar seed:', error);
    await mongoose.disconnect();
    process.exit(1);
  });
