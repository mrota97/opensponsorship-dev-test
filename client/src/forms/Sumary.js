import * as React from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"

import Select from "react-select"
import moment from "moment"

export default function SummaryCard({
  accordionActiveKey,
  name = "John Doe",
  sports = "N/A",
  gender = "Male",
  dob = moment().toDate(),
  about = "N/A",
  interests = "N/A",
  location = "20 W 34th St, New York, NY 10001",
  team = "New York Yankees",
  onSubmit,
  previousForm,
}) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={accordionActiveKey}>
        Summary
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={accordionActiveKey}>
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
                  value={sports}
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
                <Form.Control readOnly value={moment(dob).format("MM/DD/YY")} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" htmlSize={3} readOnly value={about} />
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
                <Form.Control readOnly value={team} />
              </Col>
            </Form.Group>

            <Button variant="success" type="submit">Submit</Button>{' '}
            <Button variant="outline-secondary" onClick={previousForm}>Back</Button>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}