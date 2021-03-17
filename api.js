const express = require("express")
const router = express.Router()
const Profile = require("./ProfileModel")
const aws = require("aws-sdk")

const S3_BUCKET = process.env.S3_BUCKET_NAME
aws.config.region = "us-east-1"

router.get("/sign-s3", (req, res, next) => {
  const s3 = new aws.S3()
  const fileName = req.query['file-name']
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err)
      return res.send({ msg: "Error getting signed URL", status: 500 })
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }

    console.log(returnData)

    res.send({ msg: "Success", ...returnData })
  })
})

router.get("/profile", async (req, res, next) => {
  try {
    const allProfiles = await Profile.find()
    res.send({ msg: "Success", status: 200, data: allProfiles })
  } catch (error) {
    next(error)
  }
})

router.post("/profile/create", async (req, res, next) => {
  try {
    // we'll just use the spread syntax here to fill all of the
    // required fields. mongoose validation will catch any isseus
    const newProfile = new Profile({ ...req.body })

    await newProfile.save()

    // finish
    res.send({
      msg: "Success",
      status: 200,
      data: newProfile._id.toString()
    })
  } catch (error) {
    next(error)
  }
})

router.put("/profile/edit/:profileId", async (req, res, next) => {
  const newProfileData = req.body
  const profileId = req.params.profileId

  try {
    // find the profile document with the requested id
    const oldProfile = await Profile.findById(profileId)

    // make sure all fields are updated
    // we're expecting to get all fields from the body
    oldProfile.name = newProfileData.name
    oldProfile.sports = newProfileData.sports
    oldProfile.gender = newProfileData.gender
    oldProfile.dob = newProfileData.dob
    oldProfile.about = newProfileData.about
    oldProfile.location = newProfileData.location
    oldProfile.team = newProfileData.team
    oldProfile.interests = newProfileData.interests
    oldProfile.profileImage = newProfileData.profileImage

    // save the document
    await oldProfile.save()

    res.send({
      msg: `Profile ${profileId} updated`,
      status: 200,
    })

  } catch (error) {
    next(error)
  }
})

router.delete("/profile/delete/:profileId?", async (req, res, next) => {
  const profileId = req.params.profileId
  try {
    let result
    if (profileId) {
      result = await Profile.deleteOne({ _id: profileId })
    } else {
      result = await Profile.deleteMany({})
    }
    
    if (!result.ok) throw "error";
    res.send({
      msg: `${result.deletedCount} profiles deleted`,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router