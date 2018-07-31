import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';

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
    paddingBottom: 15,
  },
  myform: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  mybutton: {
    marginTop: 15,
  },
  myicon: {
    paddingRight: 30,
  },
  input: {
    marginRight: 15,
    width: 25,
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}


class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: '',
      selectedType: {},
      distance: '',
      hours: '01',
      minutes: '00',
      seconds: '00',
    }

  }

  handleChange = (key) => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleFieldChange = (value) => {
    this.setState({ selectedType: value });
  }

  handleClick = (e) => {
    let exercise = {
      name: this.state.name,
      type: this.state.selectedType.id,
      type_name: this.state.selectedType.name,
      distance: this.state.distance,
      duration: this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds,
      session: this.props.session
    }
    this.setState(prevState => ({
      data: [...prevState.data, exercise],
      name: '',
      selectedType: {},
    }))
  }

  render() {
    const { classes } = this.props;

    console.log(this.state.data)
    return (
      <Grid item sx={9} >
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Содержание тренировки</TableCell>
                <TableCell numeric>Дистанция (км)</TableCell>
                <TableCell numeric>Время</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.type_name}
                    </TableCell>
                    <TableCell numeric>{n.distance}</TableCell>
                    <TableCell numeric>{n.duration}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Card className={classes.card} style={{ marginTop: 25, marginBottom: 5}}>
            <CardContent>
              <FormControl className={classes.myform} fullWidth>
                <FormLabel>Имя</FormLabel>
                <TextField
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                />
              </FormControl>

              <SimpleSelect selectedType={this.state.selectedType} onChange={this.handleFieldChange} />

              <FormControl className={classes.myform} fullWidth>
                <FormLabel>Дистанция</FormLabel>
                <Input style={{width: '100px'}}
                  placeholder='0.0'
                  value={this.state.distance}
                  onChange={this.handleChange('distance')}
                />
              </FormControl>

              <FormControl className={classes.myform} fullWidth>
                <FormLabel>Время [чч:мм:сс]</FormLabel>
                <div style={{display: 'inline-block'}}>
                  <Input
                    onChange={this.handleChange('hours')}
                    inputComponent={TextMaskCustom}
                    value={this.state.hours}
                    className={classes.input}
                  />
                  <Input
                    onChange={this.handleChange('minutes')}
                    inputComponent={TextMaskCustom}
                    value={this.state.minutes}
                    className={classes.input}
                  />
                  <Input
                    onChange={this.handleChange('seconds')}
                    inputComponent={TextMaskCustom}
                    value={this.state.seconds}
                    className={classes.input}
                  />
                </div>
              </FormControl>

            </CardContent>
            <CardActions>
              <Button variant="fab" mini color="secondary" onClick={this.handleClick}>
                <AddIcon />
              </Button>
            </CardActions>
          </Card>
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
