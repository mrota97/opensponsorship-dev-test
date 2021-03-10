import * as React from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"

import BasicInfoCard from "./forms/BasicInfo"
import AboutCard from "./forms/About"
import SummaryCard from "./forms/Sumary"

function App() {
  const [basicInfo, setBasicInfo] = React.useState({})
  const [aboutInfo, setAboutInfo] = React.useState({})
  const [getProfiles, setGetProfiles] = React.useState(true)

  React.useEffect(() => {
    console.log("test")
  }, [getProfiles])

  function onSubmit(e) {
    e.preventDefault()
    const payload = { ...basicInfo, ...aboutInfo }
    axios.post("/api/profiles/create", payload)
      .then(res => {
        setGetProfiles(true)
        console.log(res)
      })
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Athlete Profiles</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <BasicInfoCard setBasicInfo={(data) => setBasicInfo(data)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <AboutCard setAboutInfo={setAboutInfo} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SummaryCard onSubmit={onSubmit} {...basicInfo} {...aboutInfo} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
