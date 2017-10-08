import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { showModal, getUsers, deleteUser, addPoint } from '../../actions/user';
// Components
import User from '../../components/users/User';
import UserModal from '../../components/users/UserModal';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import '../../styles/users/user.css';

class UserContainer extends Component {
  componentWillMount(){
    this.props.getUsers();
  }

  show = (event, user = {}) => {this.props.showModal(user);}
  destroy = id => {this.props.deleteUser(id)}

  render(){
    const users = this.props.users.sort((a, b) => b.points - a.points)
      .map((user, index) => <User user={user} key={index} 
    onEdit={this.show} onDelete={this.destroy} onAddPoint={this.props.addPoint}/>)
    return (
      <div className="page-users">
        <h1 id="title">Users</h1>
        {users.length ?
        <Button className="create-route-btn" onClick={this.show} >
          Create User <FontAwesome name="plus"/>
        </Button>
        : <div className="alert alert-danger">You Cannot Edit Users</div>}
        <div id="users-list">{users}</div>
        {this.props.showUserModal && <UserModal /> /* re render the route so that it updates*/}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    users: state.users.users,
    showUserModal: state.users.showModal
  }
}

export default connect(mapStateToProps, { showModal, getUsers, deleteUser, addPoint })(UserContainer);
