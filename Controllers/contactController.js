const { response } = require("express");
const Contact = require("../Models/contactModel");
const moment = require('moment')

const contacts = async (req, res) => {
  try {
    for (var i = 0; i < req.body.data.length; i++) {
      const findcontact = await Contact.findOne({
        user_id: req.user._id,
        number: req.body.data[i].phoneNumbers,
      });
      if (!findcontact) {
        const addNumber = new Contact({
          number: req.body.data[i].phoneNumbers,
          name: req.body.data[i].displayName,
          user_id: req.user._id,
        });
        await addNumber.save();
      }
    }
    return res.status(200).send({
      status: 1,
      message: "Contacts Added successfully",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user._id });

    if (!contacts || contacts.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "No Contact found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Contacts found",
        data: contacts,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const blockUnblock = async (req, res) => {
  try {
    if (!req.body.number) {
      return res.status(400).send({
        status: 0,
        message: "Number Field is required",
      });
    } else {
      const number = await Contact.findOne({
        number: req.body.number,
        user_id: req.user._id,
      });
      if (!number) {
        return res.status(404).send({
          status: 0,
          message: "Number not found",
        });
      } else {
        if (number.is_block === 0) {
          const block = await Contact.findOneAndUpdate(
            { number: req.body.number },
            { is_block: 1 },
            { new: true }
          );
          return res.status(200).send({
            status: 1,
            message: "Number has been blocked",
            data: block,
          });
        } else {
          const unblock = await Contact.findOneAndUpdate(
            { number: req.body.number },
            { is_block: 0, blocking_hours: null, blocking_days: null },
            { new: true }
          );
          return res.status(200).send({
            status: 1,
            message: "Number has been un blocked",
            data: unblock,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBlockedContacts = async (req, res) => {
  try {
    const blockedContacts = await Contact.find({
      user_id: req.user._id,
      is_block: 1,
    });

    if (!blockedContacts || blockedContacts.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "No Blocked Contact found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Contacts found",
        data: blockedContacts,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const favouriteUnfavourite = async (req, res) => {
  try {
    if (!req.body.number) {
      return res.status(400).send({
        status: 0,
        message: "Number Field is required",
      });
    } else {
      const number = await Contact.findOne({
        number: req.body.number,
        user_id: req.user._id,
      });
      if (!number) {
        return res.status(404).send({
          status: 0,
          message: "Number not found",
        });
      } else {
        if (number.is_favourite === 0) {
          const favourite = await Contact.findOneAndUpdate(
            { number: req.body.number },
            { is_favourite: 1 },
            { new: true }
          );
          return res.status(200).send({
            status: 1,
            message: "Number has been Added to Favourite",
            data: favourite,
          });
        } else {
          const unfavourite = await Contact.findOneAndUpdate(
            { number: req.body.number },
            { is_favourite: 0 },
            { new: true }
          );
          return res.status(200).send({
            status: 1,
            message: "Number has been Removed from Favourite",
            data: unfavourite,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getFavouriteContacts = async (req, res) => {
  try {
    const favouriteContacts = await Contact.find({
      user_id: req.user._id,
      is_favourite: 1,
    });

    if (!favouriteContacts || favouriteContacts.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "No Favourite Contact found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Contacts found",
        data: favouriteContacts,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePreference = async (req, res) => {
  try {
    if (req.body.blocking_hours >= 1 || req.body.blocking_days >= 1) {
      const find = await Contact.findOne({
        user_id: req.user._id,
        number: req.body.number,
        is_block: 1,
      });

      if (!find) {
        return res.status(400).send({
          status: 0,
          message: "You have to Block the Contact First",
        });
      } else {

        // moment(req.body.eventDate, [
        //   moment.ISO_8601,
        //   "DD/MM/YYYY",
        // ]).format("YYYY-MM-DD");

        // moment(Date.now()).format("hh:mm") 
        // d.setHours(d.getHours() + req.body.blocking_hours); 
        const d = new Date();
        if (req.body.blocking_days) {
          d.setDate(d.getDate() + req.body.blocking_days);
        }
        else if (req.body.blocking_hours) {
          d.setHours(d.getHours() + req.body.blocking_hours);
        }
        // console.log(moment(d).format("YYYY-MM-DDTHH:mm")) 
        const unblock = await Contact.findOneAndUpdate(
          { user_id: req.user._id, number: req.body.number },
          {
            un_block_at: moment(d).format("YYYY-MM-DDTHH:mm"),
          },
          { new: true }
        );
        return res.status(200).send({
          status: 1,
          message: "Preference has benn Updated",
          data: unblock,
        });
      }
    } else {
      return res.status(400).send({
        status: 0,
        message: "No Preference Added, Contact is Blocked Permanently",
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  contacts,
  getContacts,
  blockUnblock,
  getBlockedContacts,
  favouriteUnfavourite,
  getFavouriteContacts,
  updatePreference,
};
