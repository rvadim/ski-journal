import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Icon from '@material-ui/core/Icon';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SimpleSelect from '../add/Select'


const styles = theme => ({
  root: {
    margin: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  myform: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  mybutton: {
    marginTop: 15,
  },
  myicon: {
    paddingRight: 30
  }
});


class ExerciseForm extends Component {
  state = {
    comment: null,
  }

  handleChange = (key) => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    let id = 0;
    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }
    const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

    return (
      <Grid item sx={9} >
        <Paper className={classes.paper}>

        <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Содержание тренировки</TableCell>
          <TableCell numeric>Low (км)</TableCell>
          <TableCell numeric>Middle (км)</TableCell>
          <TableCell numeric>High (км)</TableCell>
          <TableCell numeric>Объем</TableCell>
          <TableCell numeric>Время</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n => {
          return (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell numeric>{n.calories}</TableCell>
              <TableCell numeric>{n.fat}</TableCell>
              <TableCell numeric>{n.carbs}</TableCell>
              <TableCell numeric>{n.protein}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

          <FormControl className={classes.myform} fullWidth>
            <FormLabel>Имя</FormLabel>
            <TextField
              value={this.state.comment}
              multiline={true}
              rows={2}
              onChange={this.handleChange('comment')}
            />
          </FormControl>
          <SimpleSelect />
        </Paper>
        <Button variant="contained" size="small">
          <Icon className={classes.myicon}>library_add</Icon>
          Добавить тренировку
        </Button>
      </Grid>
    )
  }
}

export default withStyles(styles)(ExerciseForm);
