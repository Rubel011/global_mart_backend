const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    imageUrls:
        [{
            type: String,
            required: true
        }]
    ,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    availablity: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
    }

}
)

const Product = mongoose.model("Product", productSchema)
module.exports = { Product }