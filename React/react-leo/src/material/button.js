import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class AButton extends Component {
  render () {
    return (
      <Button variant="contained" color="primary">
        你好，世界
      </Button>
    );
  }
}