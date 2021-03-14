const mongoose = require("mongoose")

/**
 * Fields:
 * name,
 * dob: Date of Birth
 * location,
 * team: Favorite team
 * gender,
 * sports,
 * about,
 * interests,
 * profileImage
 */

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  sports: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
  // profileImage: {
  //   data: Buffer,
  //   contentType: {
  //   type: String,
  //   required: true,
  //   },
  // },
})

module.exports = mongoose.model("Profile", profileSchema)