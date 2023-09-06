const express = require("express")
const userController = require("../controllers/user.controller")
const auth = require("../auth")
// const userModel = require("../models/user.model")
const {verify, verifyAdmin} = auth;

const router = express.Router();

router.route("/")
//get all users information
    .get(userController.getAllUserInformations)

//post-add user
router.post("/registration", (req, res) => {
    userController.createNewUser(req.body)
    .then(resultFromController => {
        if(resultFromController) {
            res.status(201).send("User created successfully");
        } else {
            res.status(500).send("Failed to create user");
        }
    })
    .catch(error => {
        console.error("Error creating user:", error);
        res.status(500).send("An error occurred while creating user")
    })
})

router.post("/login", (req, res) => {
    userController.loginUser(req.body)
    .then(resultFromController => {
        if(resultFromController){
            res.status(201).send("User logged in")
        }else {
            res.status(500).send("User doesn't exist")
        }
    })
});

router.put('/updateAdmin', verify, verifyAdmin, userController.updateUserAsAdmin);

router.route(":/id")
    .get(userController.getAllUserInformations)




module.exports = router;