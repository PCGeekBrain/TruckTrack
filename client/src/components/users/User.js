import React from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';
import CounterButton from './CounterButton';

const User = ({user, onEdit, onDelete, onAddPoint}) => {

  const edit = (event) => {
    event.preventDefault();
    onEdit(event, user);
  }

  const deleteItem = () => {
    onDelete(user.id);
  }

  const addPoint = () => {
    onAddPoint(user.id);
  }

  return (
    <div className="user-card card">
      <h2>{user.username}</h2>
      <p>{user.role} | {user.email}</p>
      <ButtonGroup>
        <Button bsStyle="primary" onClick={edit}>Edit</Button>
        <Button bsStyle="danger" onClick={deleteItem}>Delete</Button>
        <CounterButton bsStyle="info" initial={user.points} onIncrement={addPoint}/>
      </ButtonGroup>
    </div>
  )
}

export default User;