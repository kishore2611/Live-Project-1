const Content = require("../Models/contentModel");
const User = require("../Models/userModel");

const getContent = async (req, res) => {
  if (!req.params.type) {
    return res.status(400).send({
      status: 0,
      message: "Type is required.",
    });
  } else {
    Content.findOne({ type: req.params.type })
      .exec()
      .then((content) => {
        if (content) {
            const url = `http://server.appsstaging.com:3015/${req.params.type}`
          res.status(200).send({
            status: 1,
            message: "Content found Successfully",
            data: content, url
          });
        } else {
          res.status(404).send({
            status: 0,
            message: "Content not found.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: 0,
          message: err.message,
        });
      });
  }
};

const notificationOnOff = async (req, res) => {
  try {
    const notification = await User.findOne({
      _id: req.user._id
    })

    if(notification.is_notification === 0){
      const notificationOn = await User.findOneAndUpdate({
        _id: req.user._id
      },{is_notification: 1},{new: true})
      return res.status(200).send({
        status: 1,
        message: "Notification On.",
        // data: notificationOn
      });

    }
    else if(notification.is_notification === 1){
      const notificationOff = await User.findOneAndUpdate({
        _id: req.user._id
      },{is_notification: 0},{new: true})
      return res.status(200).send({
        status: 1,
        message: "Notification Off.",
        // data: notificationOff
      });

    }
    else{
      return res.status(404).send({
        status: 0,
        message: "User Not Found."
      });
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


module.exports = {
  getContent,
  notificationOnOff
};
