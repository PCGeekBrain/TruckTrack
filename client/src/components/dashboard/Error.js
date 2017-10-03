import React from 'react';

import { Alert } from 'react-bootstrap'

/**
 * A wrapper for the error alert
 * @param {error: {key, message}, onDismiss: (key) => {} } props
 */

const Error = props => {
  const dismiss = (event) => {
    props.onDismiss(props.error.key)
  }
  return (
    <Alert bsStyle="danger" onDismiss={dismiss}>
      <p>{props.error.msg}</p>
    </Alert>
  );
}

export default Error;