const jwt = require("jsonwebtoken")
const hash = "secretAPI"

module.exports.createAccessToken = (user) => {

    const data = {
        id : user_id,
        email : user.email,
        isAdmin : user.isAdmin
    }
    return jwt.sign(data, hash, {});
}

module.exports.verify = (req, res, next) => {
    console.log("This is from req.headers.authorization")
    console.log(req.headers.authorization)

    let token = req.headers.authorization;

    if(typeof token === "undefined"){
        return res.send({auth : "Failed. No Token"});
    }else {
        console.log("With bearer prefix")
		console.log(token);
		token = token.slice(7,token.length)
		console.log("No bearer prefix")
		console.log(token);
    }

    jwt.verify(token, hash, function(err, decodedToken){
        if(err){
            return res.send({
                auth: "Failed",
                message: err.message
            })
        }else{
            console.log("data that will be assigned to the req.user")
            console.log(decodedToken);

            req.user = decodedToken
            next()
        }
    })
}

module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin){
		next()
	}else{
		return res.send({
			auth:"Failed",
			message:"Action Forbidden"
		})
	}
}