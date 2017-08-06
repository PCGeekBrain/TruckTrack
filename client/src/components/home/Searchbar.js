import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';
import '../../styles/home/Searchbar.css';

/*
  Searchbar Component for Homepage

  internal state: query, option
  onsubmit: calls props.onSubmit with internal state
*/

class Searchbar extends Component {

  componentWillMount(){
    this.state = {
      query: "", 
      option: this.props.options[0]
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render(){
    const options = this.props.options.map((option, index) => <option key={index} value={option}>{option}</option>)
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl id="query" type="text" value={this.state.query} onChange={this.handleChange}/>
            <FormControl id="option" componentClass="select" 
                value={this.state.type} onChange={this.handleChange}>
              {options}
            </FormControl>
            <InputGroup.Button>
              <Button type="submit"><Glyphicon glyph="search"/></Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

export default Searchbar;