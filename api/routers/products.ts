import express from "express";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import {Error} from "mongoose";
import Category from "../models/Category";
import auth, {RequestWithUser} from "../middleware/auth";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    if (req.query.category_id) {
        try{
            const category = await Category.findById(req.query.category_id);
            if (!category) {
                res.status(400).send({error: "Category not found"});
            }
            else {
                const products = await Product.find({category: req.query.category_id});
                res.send(products);
            }
        }
        catch (e){
            next(e);
        }
    }
    else{
        try {
            const products  =  await Product.find().populate("category");
            res.send(products);
        } catch (e) {
            next(e);
        }
    }

});

productsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('Not Found');
    }

    try {
        const product = await Product.findById(id);

        if (!product) res.status(404).send('Not Found');

        res.send(product);
    } catch (e) {
        next(e);
    }
});


productsRouter.post('/', imagesUpload.single('image'), async (req: express.Request, res: express.Response, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'Токен отсутствует.'});
        return;
    }

    const user = await Product.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Пользователь, соответствующий этому токену, не найден.'});
        return;
    }
    if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) res.status(404).send('Not Found category');
    }

    try {
        const product = new Product({
            user: user._id,
            category:req.body.category ,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? 'images' + req.file.filename : null,
            price:req.body.price,
        });

        await product.validate();
        await product.save();

        res.send(product);
    }  catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

productsRouter.delete('/:id',auth, async (req, res, next) => {
    try{
        let expressReq = req as RequestWithUser
        const user = expressReq.user;
        const product = await Product.findById(req.params.id);
        if(!user){
            res.status(404).send({error: 'No authorized'});
            return;
        }

        if (!product) {
            res.status(404).send({error: 'Product not found'});
        }

        else if(product.user.toString() !== user._id.toString()) {
            res.status(403).send({error:"You are trying to delete someone else's product"});
        }
        else{
            await Product.deleteOne({_id: req.params.id});
            res.send({message: "Product deleted successfully."});
        }

    }catch(error){
        next(error);
    }
});
export default productsRouter;
