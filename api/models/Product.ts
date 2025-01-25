import mongoose, {Schema} from 'mongoose';

const  ProductSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Username is required'],
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
    },
    title: {
        type: String,
       required: [true, 'Title is required'],
    },
    description: {
        type:String,
        required: [true, 'Description is required'],
    },
    image: {
        type:String,
        required: [true, 'Image is required'],
    },

    price: {
        type: Number,
        required: true,
    },
});


const Product = mongoose.model('Product', ProductSchema);
export default Product;