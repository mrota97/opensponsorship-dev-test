import React from "react"
import CardColumns from "react-bootstrap/CardColumns"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { run as runHolder } from "holderjs/holder"

const ProfileCard = ({ profile, selectProfile }) => {
  const { name, gender, about, sports, profileImage } = profile
  React.useEffect(() => {
    // hack to keep images loaded during state changes
    if (!profileImage) {
      runHolder(null)
    }
  })

  // get the first three sports in a readable format
  const renderSports = sports
    .slice(0, 2)
    .map(value => <ListGroup.Item>{value.label}</ListGroup.Item>)

  return (
    <Card>
      <Card.Img variant="top" src={profileImage || "holder.js/100px160"} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{gender}</Card.Subtitle>
        <Card.Text>
          {about}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {renderSports}
      </ListGroup>
      <Card.Body>
        <Button variant="link" onClick={() => selectProfile(profile._id)}>View Profile</Button>
      </Card.Body>
    </Card>
  )
}

const ProfileList = ({ isStale, data, selectProfile }) => {
  // 
  if (isStale && !data) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  if (!data) {
    return <p>Nothing to see here...</p>
  }
  
  const { profileIdList, profileIdMap } = data
  let profileCards = profileIdList.map(profileId => (
    <ProfileCard
      profile={profileIdMap[profileId]}
      selectProfile={selectProfile}
    />
  ))
  

  return (
    <CardColumns className="pt-3">
      {profileCards}
    </CardColumns>
  )
}

export default ProfileList