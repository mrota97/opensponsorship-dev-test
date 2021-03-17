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
    required: [true, "Please enter your name."],
  },
  dob: {
    type: Date,
    required: [true, "Please enter your date of birth."],
  },
  location: {
    type: String,
    required: [true, "Please enter a location."],
  },
  team: {
    type: String,
    required: [true, "Please enter your favorite team."],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender."],
  },
  // sports: {
  //   type: [String],
  //   validate: [list => list.length > 0, "You must provide one or more sports"]
  // },
  sports: [{
    label: String,
    value: String,
    id: Number,
  }],
  about: {
    type: String,
    required: [true, "Please add a short description about yourself."],
  },
  interests: {
    type: String,
    required: [true, "Please list some of your interests."],
  },
  profileImage: String,
})

module.exports = mongoose.model("Profile", profileSchema)