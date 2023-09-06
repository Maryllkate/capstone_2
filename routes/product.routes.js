const express = require("express")
const productController = require("../controllers/product.controller")
const auth = require("../auth")
const {verify, verifyAdmin} = auth;

const router = express.Router();


router.post("/create-product", verify, verifyAdmin, productController.addProduct)
router.get("/retrieve-products", verify, verifyAdmin, productController.retrieveProducts)
router.get("/active-products", productController.activeProducts)

router.get("/retrieve-single-product", productController.retrieveSingleProduct);
router.put("/update-product/:Id", verify, verifyAdmin, productController.updateProduct);
router.put("/archive-product?:id", verify, verifyAdmin, productController.archiveProduct);
router.put("/activate-product/:id", verify, verifyAdmin, productController.activateProduct);

router.post("/guestCheckout", verify, productController.guestCheckout);
router.get("/retrieve-user", productController.retrieveUser);
module.exports = router;