import mongoose from "mongoose";
import config from "./config";
import { randomUUID } from "node:crypto";
import User from "./models/User";
import Category from "./models/Category";
import Product from "./models/Product";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("products");
        await db.dropCollection("categories");
    } catch (e) {
        console.error(e);
    }

    const [user1, user2] = await User.create(
        {
            username: "Maria",
            password: "123",
            token: randomUUID(),
            displayName: "Maria Sidorova",
            phoneNumber: "0990121113",
        },
        {
            username: "Alexei",
            password: "123",
            token: randomUUID(),
            displayName: "Alexei Pupkin",
            phoneNumber: "09921211134",

        }
    );
 const [autoCategory, housingCategory, animalsCategory] = await Category.create(
     {
         title: 'auto',
     },
     {
         title: 'housing',
     },
     {
         title: 'home animals',
     });

     await Product.create(
        {
            user: user1._id,
            category: autoCategory._id,
            title: 'Kia Optima',
            description: "\n" +
                "4 generations\n" +
                "Sedan and station wagon\n" +
                "2000 – 2020\n" +
                "D-class, front-wheel drive. Automatic, manual, robot and CVT. Gasoline, LPG, diesel and hybrid engines with power from 123 to 278 horsepower.",
            image: "fixtures/product1.jpeg",
            price:16000,
        },
        {
            user: user1._id,
            category: autoCategory._id,
            title: 'Kia Sorento',
            description: "\n" +
                "4 generations\n" +
                "Sedan and station wagon\n" +
                "2000 – 2020\n" +
                "D-class, front-wheel drive. Automatic, manual, robot and CVT. Gasoline, LPG, diesel and hybrid engines with power from 123 to 278 horsepower.",
            image: "fixtures/product2.jpeg",
            price:16500,
        },
        {
            user: user2._id,
            category: housingCategory._id,
            title: '2 room apartment',
            description: "\n" +
                "Selling 2k, 105s, 52m2, Kant, 51t$ Furniture as a GIFT to new owners, Documents in hand, we will consider a MORTGAGE, On the 2nd floor of 3, NOT CORNER, Central communications, Gas connected, 1 minute from public transport stop No. 1, First house at the entrance to the Military Town.",
            image: "fixtures/product3.jpeg",
            price:51500,
        },
        {
            user: user2._id,
            category: housingCategory._id,
            title: '3 room apartment',
            description: "\n" +
                "Selling 3k, 105s, 52m2, Kant, 51t$ Furniture as a GIFT to new owners, Documents in hand, we will consider a MORTGAGE, On the 2nd floor of 3, NOT CORNER, Central communications, Gas connected, 1 minute from public transport stop No. 1, First house at the entrance to the Military Town.",
            image: "fixtures/product4.jpeg",
            price:47500,
        },
        {
            user: user2._id,
            category: animalsCategory._id,
            title: 'Fold cat',
            description: "\n" +
                "I sell kittens. Mother of the Russian Blue breed. 1.5 months, wormed, treated for fleas. They eat everything and go to the litter box. Price 500 som.",
            image: "fixtures/product5.jpeg",
            price:500,
        },
    );

    await db.close();
};

run().catch(console.error);
