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

class MinuteSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
        '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35',
        '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',
        '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
      ],
      selectedMinutes: '',
    }
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value)
    this.setState({ selectedMinutes: e.target.value })
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl>
          <Select value={this.props.selectedMinutes} onChange={this.handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.minutes.map((minute, index) => (
              <MenuItem key={index} value={minute}>{minute}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(MinuteSelect);
