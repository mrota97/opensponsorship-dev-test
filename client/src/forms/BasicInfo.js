import * as React from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Select from "react-select"

import SportTypes from "../sportTypes"

// const sport_types = require("../sportTypes.json")

export default function BasicInfoCard({ setBasicInfo }) {
  const [name, setName] = React.useState("")
  const [sport, setSport] = React.useState("")
  const [gender, setGender] = React.useState("")
  const [dob, setDob] = React.useState(new Date())

  function handleSubmit(e) {
    e.preventDefault()
    const data = { name, sport, gender, dob }
    console.log("submitting")
    setBasicInfo(data)
  }
  
  return (
    <Card className="mt-3">
      <Card.Header>Basic Info</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </Form.Group>

          {/* Sport */}
          <Form.Group controlId="formSport">
            <Form.Label>Sport</Form.Label>
            <Select
              options={SportTypes}
              // onSelect={(e) => console.log(e.name)}
              // onRemove={() => console.log("removed")}
            />
          </Form.Group>
          
          {/* Gender */}
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Gender"
              onChange={(e) => setGender(e.currentTarget.value)}
            />
          </Form.Group>

          {/* Sport */}
          <Form.Group controlId="formSport">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              onChange={(e) => setDob(e.target.valueAsDate)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}