import * as React from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function AboutCard({ setAboutInfo }) {
  const [description, setDescription] = React.useState("")
  const [interests, setInterests] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [teamName, setTeamName] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const data = { description, interests, location, teamName }
    console.log("submitting")
    setAboutInfo(data)
  }
  
  return (
    <Card className="mt-3">
      <Card.Header>About</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Description */}
          <Form.Group controlId="formDescription">
            <Form.Label>Describe Yourself</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group controlId="formInterests">
            <Form.Label>What are your interests?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setInterests(e.currentTarget.value)}
            />
          </Form.Group>
          
          {/* Location */}
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              onChange={(e) => setLocation(e.currentTarget.value)}
            />
          </Form.Group>

          {/* Team Name */}
          <Form.Group controlId="formTeamName">
            <Form.Label>Team</Form.Label>
            <Form.Control
              type="text"
              placeholder="Team Name"
              onChange={(e) => setTeamName(e.currentTarget.value)}
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