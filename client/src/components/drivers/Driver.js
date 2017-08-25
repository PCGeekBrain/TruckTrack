import React from 'react';

import { Button } from 'react-bootstrap';

const Driver = (props) => {

  const edit = (event) => {
    event.preventDefault();
    props.onEdit(event, props.driver)
  }


  return (
    <div className="driver-card card">
      <h2>{props.driver.username}</h2>
      <p>{props.driver.role}</p>
      <Button onClick={edit}>Edit</Button>
    </div>
  )
}

export default Driver;