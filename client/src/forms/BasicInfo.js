import * as React from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"

// add some custom input components for multi-select and date picking
import Select from "react-select"
import Datetime from "react-datetime"
import moment from "moment"

// validation helper
import * as Yup from "yup"

import SportTypes from "../sportTypes"

// use Yup to validate our inputs
const basicInfoValidation = Yup.object({
  name: Yup.string().required('Please enter your name'),
  dob: Yup.date().max(moment().subtract(1, "day"), "Please enter a valid birthday."),
  sports: Yup.array(Yup.mixed()).min(1, "Please list one or more sports"),
  gender: Yup.string().required('Please enter your gender')
})

function BasicInfoForm({ setBasicInfo, openBasicInfo, shouldFormReset, isEditing, selectedProfile }) {
  const [errors, setErrors] = React.useState({})
  const [name, setName] = React.useState("")
  const [dob, setDob] = React.useState(moment().toDate())
  const [sports, setSports] = React.useState([])
  const [gender, setGender] = React.useState("")

  // if we want to edit the profile, populate the form with its fields
  React.useEffect(() => {
    if (selectedProfile) {
      console.log(selectedProfile)
      setName(selectedProfile.name)
      setDob(moment(selectedProfile.dob))
      setSports(selectedProfile.sports)
      setGender(selectedProfile.gender)

      // open the card as well
      openBasicInfo()
    }
  }, [isEditing])

  React.useEffect(() => {
    if (shouldFormReset) {
      setErrors({})
      setName("")
      setDob(moment())
      setSports([])
      setGender("")
    }
  }, [shouldFormReset])

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = { name, dob, sports, gender }
    // check validity
    try {
      await basicInfoValidation.validate(formData, { abortEarly: false })
      setErrors({})
      setBasicInfo(formData)
    } catch (err) {
      // if the form doesn't validate we get a list of ValidationErrors
      // iterate through the list and store errors in state
      const validationErrors = {}
      err.inner.forEach(innerError => {
        validationErrors[innerError.path] = innerError.message
      })
      setErrors(validationErrors)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Name */}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={event => setName(event.currentTarget.value)}
          // isInvalid={!!props.errors.name}
        />
        {errors.name && <div className="form-text text-danger">{errors.name}</div>}
      </Form.Group>

      {/* Date of Birth */}
      <Form.Group>
        <Form.Label>Date of Birth</Form.Label>
        <Datetime
        // value={dob}
        timeFormat={false}
        isValidDate={currentDate => currentDate.isBefore(moment().subtract(1, "day"))}
        onChange={value => setDob(value)}
        closeOnSelect
      />
        {errors.dob && <div className="form-text text-danger">{errors.dob}</div>}
      </Form.Group>
      
      {/* Sports */}
      <Form.Group>
        <Form.Label>Sports</Form.Label>
        <Select
        options={SportTypes}
        name="sports"
        onChange={setSports}
        value={sports}
        isMulti
        // the parent for this select component has its overflow hidden
        // render the menu directly under the container using a portal to get around this
        menuPortalTarget={document.getElementById("container-root")}
      />
        {errors.sports && <div className="form-text text-danger">{errors.sports}</div>}
      </Form.Group>
      
      
      {/* Gender */}
      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Form.Control
          id="gender"
          name="gender"
          type="text"
          placeholder="Gender"
          onChange={event => setGender(event.currentTarget.value)}
          value={gender}
          // isInvalid={!!props.errors.gender}
        />
        {errors.gender && <div className="form-text text-danger">{errors.gender}</div>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Next
      </Button>
    </Form>
  )
}

export default function BasicInfoCard({ accordionActiveKey, setBasicInfo, toggleBasicInfo, openBasicInfo, shouldFormReset, isEditing, selectedProfile }) {
  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        onClick={toggleBasicInfo}
        eventKey={accordionActiveKey}
      >
        Basic Info
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={accordionActiveKey}>
        <Card.Body className="mb-3">
          <BasicInfoForm
            setBasicInfo={setBasicInfo}
            openBasicInfo={openBasicInfo}
            shouldFormReset={shouldFormReset}
            isEditing={isEditing}
            selectedProfile={selectedProfile}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}