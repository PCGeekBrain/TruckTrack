import React, {Component} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

class Searchbar extends Component {
  componentWillMount(){
    this.state = {query: "", type: "invoice"}
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  render(){
    return (
      <form className="search-bar">
        <FormGroup>
          <FormControl type="text" value={this.state.query} onChange={this.handleChange}/>
        </FormGroup>
      </form>
    )
  }
}

export default Searchbar;