const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./routes/user.routes")
const productRoutes = require("./routes/product.routes")

const port = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

mongoose.connect("mongodb+srv://marylldriz:Chikit%400016@b-297.ynrfqyy.mongodb.net/mystoreDB?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let myStoreDB = mongoose.connection;
myStoreDB.on('error', console.error.bind(console, "connection error"));
myStoreDB.on('open', () => console.log("connected to mongoDB Atlas"));

//Routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

if(require.main === module){
    app.listen(port, () => console.log(`server is running at ${port}`));
}

module.exports = app;