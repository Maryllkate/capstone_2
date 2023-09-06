const user = require("../models/user.model")
const bcrypt = require("bcrypt-nodejs")
const auth = require("../auth")

//get all users information
const getAllUserInformations = ("/", (req, res) => {
    user.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

//post-add user
const createNewUser = (reqbody) => {
    let newUser = new user({
        email : reqbody.email,
        password: reqbody.password, //bcrypt.hashSync(reqbody.password,10)
		orderProduct : reqbody.orderProduct
	})

    return newUser.save().then((user,error)=>{

		if(error){
			return false;
		}else{
			return true
		}

	})
	.catch(err=>err)
}

const loginUser = (reqbody) => {
    return user.findOne({email:reqbody.email}).then(result=>{
		if(result===null){
			return false;
		}else{
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
			if(isPasswordCorrect){
				return res.send({access: auth.createAccessToken(result)})
			}
			else{
				return res.send(false);
			}


		}
	})
	.catch(err=>err)
}

const updateUserAsAdmin = async (req, res) => {
	try {
	  const { userId } = req.body;
  
	  // Find the user and update isAdmin flag
	  const user = await user.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  user.isAdmin = true;
  
	  // Save the updated user document
	  await user.save();
  
	  res.status(200).json({ message: 'User updated as admin successfully' });
	} catch (error) {
	  res.status(500).json({ error: 'An error occurred while updating the user as admin' });
	}
};


module.exports = {
    getAllUserInformations,
    createNewUser,
    loginUser,
	updateUserAsAdmin
}