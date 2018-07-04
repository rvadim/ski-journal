import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Report extends Component {
  render() {
    return (
        <p>Hello world</p>
    )
  }
}

export default withStyles(styles)(Report);
