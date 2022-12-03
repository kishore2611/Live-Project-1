var FCM = require("fcm-node");
var serverKey = "AAAAETKFmf4:APA91bEh9PXbXQgSg152znLNM8moWW-NkM69JGF6HAubiPDXES3jafjYrJoUSh59dJy_zTZK8JSgU_PHZqNRb3SVBvsRYpQjbBaaE6cRbiOXDGmasMW8CESdJXzK9tTylJIpxrnzLs2m"; //put your server key here
var fcm = new FCM(serverKey);

const push_notifications = (notification_obj) => {
  var message = {
    to: notification_obj.user_device_token,
        collapse_key: "your_collapse_key",

    notification: {
      user_id: notification_obj.user_id,
      hospital_id: notification_obj.hospital_id,
      name: notification_obj.name,
      profilePicture: notification_obj.profilePicture,
      title: notification_obj.title,
      body: notification_obj.body,
      notification_type: notification_obj.notification_type,
      //   type: notification_obj.type
    },

    data: {
      //you can send only notification or only data(or include both)
      //   sender_object: notification_obj.sender_objects,
      //   receiver_object: notification_obj.receiver_objects,
      user_id: notification_obj.user_id, 
      hospital_id: notification_obj.hospital_id,
      name: notification_obj.name,
      profilePicture: notification_obj.profilePicture,
      notification_type: notification_obj.notification_type,
      //   sender_object: JSON.parse(notification_obj.sender_objects),
      //   receiver_object: JSON.parse(notification_obj.receiver_objects)
    },
  };
  console.log("message:", message);
  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = { push_notifications };
