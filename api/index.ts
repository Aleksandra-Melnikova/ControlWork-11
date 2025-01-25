import express from "express";
import cors from "cors";
import config from "./config";
import * as mongoose from "mongoose";
import usersRouter from "./routers/users";
import mongoDb from "./mongoDb";
import productsRouter from "./routers/products";
import categoriesRouter from "./routers/categories";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));


