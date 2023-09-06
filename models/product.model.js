const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name : String,
    description : String,
    price: Number,
    isActive : {
        type : Boolean,
        default : true
    },
    createdOn : {
        type : Date,
        default : new Date()
    },
    userOrders : [
        {
            userId : {
                type : Object
            },
            orderId : {
                type : String
            }
        }
    ]
})

module.exports = mongoose.model("product", productSchema)