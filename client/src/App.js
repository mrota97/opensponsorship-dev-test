import * as React from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Accordion from "react-bootstrap/esm/Accordion"

import BasicInfoCard from "./forms/BasicInfo"
import AboutCard from "./forms/About"
import SummaryCard from "./forms/Sumary"
import ProfileList from "./ProfileList"
import ProfileModal from "./ProfileModal"

function App() {
  // our profile list, and a bool to track if we need to get new data
  const [profiles, setProfiles] = React.useState(null)
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [isStale, setIsStale] = React.useState(true)
  const [isEditing, setIsEditing] = React.useState(false)
  const [resetForm, setResetForm] = React.useState(false)

  const [showModal, setShowModal] = React.useState(false)
  const [accordionState, setAccordionState] = React.useState('0')
  const [basicInfo, setBasicInfo] = React.useState(null)
  const [aboutInfo, setAboutInfo] = React.useState(null)
  
  React.useEffect(() => {
    if (basicInfo) {
      setAccordionState("1")
    }
  }, [basicInfo])

  React.useEffect(() => {
    if (aboutInfo) {
      setAccordionState("2")
    }
  }, [aboutInfo])

  // retrieve profile data from the database when our local data is marked stale
  React.useEffect(() => {
    if (isStale) {
      axios.get("/api/profile")
      .then(({ data, msg, status }) => {
        setProfiles(data.data)
        setIsStale(false)
      })
      .catch(err => {
        setIsStale(false)
      })
    }
  }, [isStale])

  function toggleEditingMode() {
    // close the modal
    setShowModal(false)
    // toggle isEditing
    setIsEditing(true)
  }

  function onSubmit(e) {
    e.preventDefault()

    // this state is used to track if the form should be reset
    // after successful submission, each child form will react to it
    setResetForm(false)

    const payload = { ...basicInfo, ...aboutInfo }
    if (isEditing && selectedProfile) {
      axios.put(`/api/profile/edit/${selectedProfile}`, payload)
        .then(res => {
          setIsEditing(false)
          setIsStale(true)
          
          // close accordion and reset form state
          setAccordionState("-1")
          setBasicInfo(null)
          setAboutInfo(null)
        })
        .catch(err => {
          console.log(err)
          alert("Could not create profile")
        })
    } else {
      axios.post("/api/profile/create", payload)
        .then(res => {
          setIsStale(true)
          
          // close accordion and reset form state
          setAccordionState("-1")
          setBasicInfo(null)
          setAboutInfo(null)
          setResetForm(true)
        })
        .catch(err => {
          console.log(err)
          alert("Could not create profile")
        })
    }
  }

  return (
    <>
      <ProfileModal
        profile={profiles?.profileIdMap[selectedProfile] || {}}
        show={showModal}
        closeModal={() => setShowModal(false)}
        toggleEditing={toggleEditingMode}
      />
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>Athlete Profiles</Navbar.Brand>
      </Navbar>
      <Container className="pt-3" id="container-root">
        <Accordion activeKey={accordionState}>
          <BasicInfoCard
            accordionActiveKey="0"
            setBasicInfo={(data) => setBasicInfo(data)}
            toggleBasicInfo={() => {
              if (accordionState === "0") setAccordionState("-1")
              else if (accordionState === "-1") setAccordionState("0")
            }}
            openBasicInfo={() => setAccordionState("0")}
            shouldFormReset={resetForm}
            isEditing={isEditing}
            selectedProfile={profiles?.profileIdMap[selectedProfile]}
          />
          <AboutCard
            accordionActiveKey="1"
            setAboutInfo={setAboutInfo}
            previousForm={() => setAccordionState("0")}
            shouldFormReset={resetForm}
            isEditing={isEditing}
            selectedProfile={profiles?.profileIdMap[selectedProfile]}
          />
          <SummaryCard
            accordionActiveKey="2"
            onSubmit={onSubmit}
            previousForm={() => setAccordionState("1")}
            {...basicInfo}
            {...aboutInfo}
          />
        </Accordion>
        <ProfileList
          isStale={isStale}
          data={profiles}
          selectProfile={id => {
            setSelectedProfile(id)
            setShowModal(true)
          }}
        />
      </Container>
    </>
  );
}

export default App;
