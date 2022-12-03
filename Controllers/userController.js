const User = require("../Models/userModel");

//Register User
const profileSetup = async (req, res) => {
  try {
    if (!req.body.fullName) {
      res.status(400).send({
        status: 0,
        message: "Full Name is required.",
      });
    } else {
      if (req.file) {
        profilePicture = req.file.path;
      }

      const profile = await User.findOneAndUpdate({_id: req.body.user_id},{
        profilePicture : (req.file ? req.file.path : req.body.profilePicture),
        fullName: req.body.fullName,
        membership: req.body.membership,
        is_complete: 1
      },{new:true})

      return res.status(200).send({
        status: 1,
        message: "Profile Setup Done",
        // profile,
        data: profile
        // {
        //     token: profile.user_authentication,
        //     user_id: profile._id
        // }
      })

    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const userDetail = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if(!user){
            return res.status(404).send({
                status: 0,
                message: "User not found"
            })
        }
        else{
            return res.status(200).send({
                status: 1,
                // message: 'Success',
                data: {
                    fullName: user.fullName,
                    profilePicture: user.profilePicture,
                    membership: user.membership                    
                }
            })

        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const updateUser = async (req, res) => {
    try {
        if (req.file) {
            profilePicture = req.file.path
        }

        const updateuser = {
            fullName : req.body.fullName,
            profilePicture : (req.file ? req.file.path : req.body.profilePicture),
            membership: req.body.membership
        }

        const updateduser = await User.findByIdAndUpdate({_id: req.user._id}, updateuser, {new: true})

        // updateuser.name = req.body.name
        // updateuser.profilePicture = (req.file ? req.file.path : req.body.profilePicture)

        // updateuser.save()

        if(!updateduser) {
            return res.status(400).send({
                status: 0,
                message: 'not updated'
            })
        }
        else{
            // updateuser.name = req.body.name

            return res.status(200).send({
                status: 1,
                message: "success",
                data: updateduser
            })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    profileSetup,
    userDetail,
    updateUser
};
