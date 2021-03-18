import React from "react"
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

import Select from "react-select"
import moment from "moment"
import { run as runHolder } from "holderjs/holder"


const ProfileModal = ({ profile, show, closeModal, toggleEditing }) => {
  React.useEffect(() => {
    // hack to keep images loaded during state changes
    if (!profile.profileImage) {
      runHolder(null)
    }
  })

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          View Profile
        </Modal.Title>  
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Row>
              <Col className="d-flex justify-content-center">
                <Image src={profile.profileImage || "holder.js/171x180"} rounded />
              </Col>
              <Col>
                {/* Name */}
                <Form.Group>
                  <Form.Label><span className="fw-bold">Name</span></Form.Label>
                  <Form.Control readOnly placeholder={profile.name || "N/A"} />
                </Form.Group>

                {/* Gender and DoB */}
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Gender</Form.Label>
                    <Form.Control readOnly placeholder={profile.gender || "N/A"} />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Birthday</Form.Label>
                    <Form.Control readOnly placeholder={profile.dob ? moment(profile.dob).format("MM/DD/YY") : "N/A"} />
                  </Form.Group>
                </Form.Row>
              </Col>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label className="fw-bold">My Sports</Form.Label>
                <Select isDisabled isMulti value={profile.sports || []} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label className="fw-bold">Location</Form.Label>
                <Form.Control readOnly placeholder={profile.location || "N/A"} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="fw-bold">Favorite Team</Form.Label>
                <Form.Control readOnly placeholder={profile.team || "N/A"} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label className="fw-bold">About Me</Form.Label>
                <Form.Control readOnly as="textarea" htmlSize={3} placeholder={profile.about || "N/A"} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="fw-bold">My Interests</Form.Label>
                <Form.Control readOnly as="textarea" htmlSize={3} placeholder={profile.interests || "N/A"} />
              </Form.Group>
            </Form.Row>

            <Row>
              <Col className="d-flex justify-content-end">
                <Button variant="outline-secondary" onClick={toggleEditing}>Edit Profile</Button>
              </Col>
            </Row>

          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ProfileModal