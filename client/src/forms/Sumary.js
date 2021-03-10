import * as React from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Select from "react-select"

let currentDate = new Date()

export default function SummaryCard({
  name = "John Doe",
  sport = "N/A",
  gender = "Male",
  dob = currentDate.toString(),
  description = "N/A",
  interests = "N/A",
  location = "20 W 34th St, New York, NY 10001",
  teamName = "New York Yankees",
  onSubmit,
}) {
  return (
    <Card className="mt-3">
      <Card.Header>Summary</Card.Header>
      <Card.Body>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control readOnly value={name} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Sport(s)
          </Form.Label>
          <Col sm="10">
            <Select
              value={sport}
              isDisabled
              isMulti
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Gender
          </Form.Label>
          <Col sm="10">
            <Form.Control readOnly value={gender} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Date of Birth
          </Form.Label>
          <Col sm="10">
            <Form.Control readOnly value={dob} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" htmlSize={3} readOnly value={description} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Interests
          </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" htmlSize={3} readOnly value={interests} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Location
          </Form.Label>
          <Col sm="10">
            <Form.Control readOnly value={location} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Team Name
          </Form.Label>
          <Col sm="10">
            <Form.Control readOnly value={teamName} />
          </Col>
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      </Card.Body>
    </Card>
  )
}