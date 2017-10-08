import React, {Component} from 'react';

import { Button } from 'react-bootstrap';

export default class CounterButton extends Component {
  componentWillMount() {
    this.setState({
      count: this.props.initial ? this.props.initial : 0
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      count: nextProps.initial ? nextProps.initial : 0
    })
  }

  increment = () => {
    // if we where given a function to call, call it
    if (this.props.onIncrement){
      this.props.onIncrement();
    } else {
      debugger;
    }
  }

  render(){
    let buttonProps = Object.assign({}, this.props);
    delete buttonProps.initial;
    return (
      <Button {...buttonProps} onClick={this.increment}>
        {this.state.count}
      </Button>
    )
  }
}