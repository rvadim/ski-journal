import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class HourSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
      ],
      selectedHour: '',
    }
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value)
    this.setState({ selectedHour: e.target.value })
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl>
          <Select value={this.props.selectedHour} onChange={this.handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.hours.map((hour, index) => (
              <MenuItem key={index} value={hour}>{hour}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(HourSelect);
