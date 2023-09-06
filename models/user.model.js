const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    email : {
        type: String,
        required : [true, "email is required"]
    },
    password : {
        type : String,
        minlength:[6,"password must be at least 8 characters"],
    },
    isAdmin : {
        type : Boolean,
        default : false
     },
    orderedProduct : [
        {
            products : [
                {
                    productId : {
                        type : String,
                        required : [true, "productId is required"]
                    },
                    productName : {
                        type : String,
                        required : [true, "product name is required"]
                    },
                    quantity : {
                        type : Number
                    }
                }
            ],
            totalAmount : {
                type : Number
            },
            purchasedOn : {
                type : Date,
                default : new Date()
            }
        }
    ]

})

module.exports = mongoose.model("user", userSchema)