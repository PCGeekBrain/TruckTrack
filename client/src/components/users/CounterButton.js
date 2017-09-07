import React, {Component} from 'react';

import { Button } from 'react-bootstrap';

export default class CounterButton extends Component {
  componentWillMount() {
    this.setState({
      count: 0
    })
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render(){
    return (
      <Button {...this.props} onClick={this.increment}>
        {this.state.count}
      </Button>
    )
  }
}