import * as React from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Image from "react-bootstrap/Image"
import * as Yup from "yup"

const aboutFormValidation = Yup.object({
  about: Yup.string().required("Please provide a description for yourself"),
  location: Yup.string().required("Please enter your location"),
  team: Yup.string().required("Please enter your favorite team"),
  interests: Yup.string().required("Please list some of your interests")
})

const AboutForm = ({ setAboutInfo, previousForm, shouldFormReset, isEditing, selectedProfile }) => {
  const [errors, setErrors] = React.useState({})
  const [about, setAbout] = React.useState("")
  const [interests, setInterests] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [team, setTeam] = React.useState("")
  const [profileImageName, setProfileImageName] = React.useState("Upload a profile image...")
  const [profileImage, setProfileImage] = React.useState(null)

  React.useEffect(() => {
    if (isEditing && selectedProfile) {
      setAbout(selectedProfile.about)
      setInterests(selectedProfile.interests)
      setLocation(selectedProfile.location)
      setTeam(selectedProfile.team)
      setProfileImage(selectedProfile.profileImage)
    }
  }, [isEditing, selectedProfile])

  React.useEffect(() => {
    if (shouldFormReset) {
      setErrors({})
      setAbout("")
      setInterests("")
      setLocation("")
      setTeam("")
      setProfileImage("Upload a profile image...")
      setProfileImage(null)
    }
  }, [shouldFormReset])

  // this function will handle uploading a submitted image file to our S3 bucket
  async function handleImageUpload(event) {
    const image = event.target.files[0]
    
    if (image == null) {
      alert("Invalid image")
    }

    try {
      // send file metadata to the api and provision a signed url
      const signedResponse = await axios.get(`/api/sign-s3?file-name=${image.name}&file-type=${image.type}`)
      
      // use the url to upload the file to S3
      const { url, signedRequest } = signedResponse.data
      console.log(url, signedRequest)
      await axios.put(signedRequest, image, { headers: { 'Content-Type': image.type }})
      
      setProfileImageName(image.name)
      setProfileImage(url)

      // const response = await axios.post("/api/uploadProfileImage", image)
      // console.log(response)
    } catch (error) {
      console.dir(error)
      setProfileImageName("Unable to upload image")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // check validity
    try {
      const formData = { about, interests, location, team, profileImage }
      await aboutFormValidation.validate(formData, { abortEarly: false })
      setErrors({})
      setAboutInfo(formData)
    } catch (err) {
      // if the form doesn't validate we get a list of ValidationErrors
      // iterate through the list and store errors in state
      const validationErrors = {}
      console.dir(err)
      err.inner && err.inner.forEach(innerError => {
        validationErrors[innerError.path] = innerError.message
      })
      setErrors(validationErrors)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>        
        <Form.Group controlId="formTeamName">
          <Form.Label>Favorite Team</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Name"
            value={team}
            onChange={(e) => setTeam(e.currentTarget.value)}
          />
          {errors.team && <div className="form-text text-danger">{errors.team}</div>}
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Your Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
          />
          {errors.location && <div className="form-text text-danger">{errors.location}</div>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Profile Image</Form.Label>
          {profileImage && <Image src={profileImage} rounded />}
          <Form.File
            id="uploaded-profile-image"
            label={profileImageName}
            onChange={handleImageUpload}
            custom
          />
        </Form.Group>

        <Form.Group controlId="formInterests">
          <Form.Label>What are your interests?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={interests}
            onChange={(e) => setInterests(e.currentTarget.value)}
          />
          {errors.interests && <div className="form-text text-danger">{errors.interests}</div>}
        </Form.Group>
      
      <Form.Group controlId="formDescription">
        <Form.Label>Describe Yourself</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
        />
        {errors.about && <div className="form-text text-danger">{errors.about}</div>}
      </Form.Group>

      <Button variant="primary" type="submit">Next</Button>{' '}
      <Button variant="outline-secondary" onClick={previousForm}>Back</Button>
    </Form>
  )
}

export default function AboutCard({ accordionActiveKey, setAboutInfo, previousForm, shouldFormReset, isEditing, selectedProfile }) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={accordionActiveKey}>
        About
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={accordionActiveKey}>
        <Card.Body>
          <AboutForm setAboutInfo={setAboutInfo} previousForm={previousForm} shouldFormReset={shouldFormReset} isEditing={isEditing} selectedProfile={selectedProfile} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}