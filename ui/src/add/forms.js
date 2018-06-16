import React, { Component } from 'react';
import { Button, Input, Icon} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'material-ui-pickers/DatePicker';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

class TrainingDayForm extends Component {
    state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render () {
  const { anchorEl } = this.state;
    return(
      <div>
        <Paper elevation={4}>
          <FormControl>
            <DatePicker />
          </FormControl>
        </Paper>
      </div>
    );
  }
}
export default TrainingDayForm;


      // <Grid container>
      //   <Grid item xs={12}>
      //     <Grid container spacing={16} alignItems='center' justify='center'>
      //     <form>
      //       <DatePicker />
      //     </form>
      //     </Grid>
      //     <Grid container spacing={16} alignItems='center' justify='center'>
      //       <Button
      //         aria-owns={anchorEl ? 'simple-menu' : null}
      //         aria-haspopup="true"
      //         onClick={this.handleClick}
      //       >
      //         Самочувствие
      //       </Button>
      //       <Menu
      //         id="simple-menu"
      //         anchorEl={anchorEl}
      //         open={Boolean(anchorEl)}
      //         onClose={this.handleClose}
      //       >
      //         <MenuItem onClick={this.handleClose}>1</MenuItem>
      //         <MenuItem onClick={this.handleClose}>2</MenuItem>
      //         <MenuItem onClick={this.handleClose}>3</MenuItem>
      //         <MenuItem onClick={this.handleClose}>4</MenuItem>
      //         <MenuItem onClick={this.handleClose}>5</MenuItem>
      //       </Menu>
      //     </Grid>
      //   </Grid>
      // </Grid>


// <div className='container'>
//     <Input s={12} label='Дата тренировки' name='on' type='date' onChange={function(e, value) {}}/>
//     <Input s={3} type='select' label="Самочувствие" defaultValue='5'>
//       <option value='5'>5</option>
//       <option value='4'>4</option>
//       <option value='3'>3</option>
//       <option value='2'>2</option>
//       <option value='1'>1</option>
//     </Input>
//     <Input s={3} type='select' label="Сон" defaultValue='5'>
//       <option value='5'>5</option>
//       <option value='4'>4</option>
//       <option value='3'>3</option>
//       <option value='2'>2</option>
//       <option value='1'>1</option>
//     </Input>
//     <Input s={3} type='select' label="Аппетит" defaultValue='5'>
//       <option value='5'>5</option>
//       <option value='4'>4</option>
//       <option value='3'>3</option>
//       <option value='2'>2</option>
//       <option value='1'>1</option>
//     </Input>
//     <Input s={3} type='select' label="Настроение" defaultValue='5'>
//       <option value='5'>5</option>
//       <option value='4'>4</option>
//       <option value='3'>3</option>
//       <option value='2'>2</option>
//       <option value='1'>1</option>
//     </Input>
//     <Input s={12} label='Погода'></Input>
//     <Input s={12} label='Комментарий'></Input>
//     <Button waves='light'>Добавить</Button>
// </div>
