import { Item } from "../models/types.d";

export const items_test: Item[] = [
    {
        item_id: '1',
        name: 'Apple',
        price: 1.5,
        description: 'A fresh and juicy apple',
        ingredients: ['apple'],
        category: 'Platos',
        keywords: ['fruit', 'apple2', 'fresh'],
        portion: 1,
        image_url: 'https://example.com/apple.jpg'
    },
    {
        item_id: '2',
        name: 'Banana',
        price: 0.5,
        description: 'A ripe banana full of energy',
        ingredients: ['banana'],
        category: 'Entradas',
        keywords: ['fruit', 'banana2', 'energy'],
        portion: 1,
        image_url: 'https://example.com/banana.jpg'
    },
    {
        item_id: '3',
        name: 'Grilled Chicken Salad',
        price: 7.99,
        description: 'A healthy grilled chicken salad',
        ingredients: ['chicken', 'lettuce', 'tomatoes', 'olive oil'],
        category: 'Bebidas',
        keywords: ['salad', 'chicken2', 'healthy'],
        portion: 2,
        image_url: 'https://example.com/grilled_chicken_salad.jpg'
    },
    {
        item_id: '4',
        name: 'Spaghetti Bolognese',
        price: 12.99,
        description: 'Traditional Italian spaghetti with Bolognese sauce',
        ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'parmesan cheese'],
        category: 'Postres',
        keywords: ['pasta', 'spaghetti2', 'Italian'],
        portion: 1,
        image_url: 'https://example.com/spaghetti_bolognese.jpg'
    },
    {
        item_id: '5',
        name: 'Chocolate Cake',
        price: 4.5,
        description: 'A delicious and moist chocolate cake',
        ingredients: ['chocolate', 'flour', 'sugar', 'butter'],
        category: 'Platos',
        keywords: ['dessert', 'chocolate2', 'cake'],
        portion: 2,
        image_url: 'https://example.com/chocolate_cake.jpg'
    },
    {
        item_id: '6',
        name: 'Caesar Salad',
        price: 6.99,
        description: 'A classic Caesar salad with crispy croutons',
        ingredients: ['lettuce', 'croutons', 'caesar dressing', 'parmesan cheese'],
        category: 'Entradas',
        keywords: ['salad', 'caesar2', 'croutons'],
        portion: 2,
        image_url: 'https://example.com/caesar_salad.jpg'
    },
    {
        item_id: '7',
        name: 'Orange Juice',
        price: 3.5,
        description: 'Freshly squeezed orange juice',
        ingredients: ['oranges'],
        category: 'Bebidas',
        keywords: ['juice', 'orange2', 'fresh'],
        portion: 1,
        image_url: 'https://example.com/orange_juice.jpg'
    },
    {
        item_id: '8',
        name: 'Tiramisu',
        price: 5.5,
        description: 'A classic Italian tiramisu dessert',
        ingredients: ['mascarpone cheese', 'coffee', 'ladyfingers', 'cocoa powder'],
        category: 'Postres',
        keywords: ['dessert', 'tiramisu2', 'Italian'],
        portion: 2,
        image_url: 'https://example.com/tiramisu.jpg'
    }
];
