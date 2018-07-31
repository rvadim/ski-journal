import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

import { getExerciseTypesData } from '../utils/Api'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [],
      selectedType: {},
    }
  }

  getExerciseTypes() {
    getExerciseTypesData().then((types) => {
      this.setState({ types })
    })
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value)
    this.setState({ selectedType: e.target.value })
  };

  componentDidMount() {
    this.getExerciseTypes()
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl>
          <FormLabel>Упражнение</FormLabel>
          <Select value={this.props.selectedType} onChange={this.handleChange} autoWidth>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.types.map(type => (
              <MenuItem key={type.id} value={type} name={type.name}>{type.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(SimpleSelect);
