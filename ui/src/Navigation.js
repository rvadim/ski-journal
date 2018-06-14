/*import React, { Component } from 'react'*/
//import { Link } from 'react-router-dom';

//class NavBar extends Component {
  //render () {
    //return (
      //<nav className="light-blue lighten-1">
        //<div className="nav-wrapper container">
          //<a id="logo-container" href="#" class="brand-logo">Ski Journal</a>
          //<ul className="right hide-on-med-and-down">
            //<li><Link to="/">Мои тренеровки</Link></li>
            //<li><a href="#">Мои отчёты</a></li>
            //<li><Link to="/add">Добавить</Link></li>
          //</ul>
        //</div>
      //</nav>
    //)
  //}
//}

/*export default NavBar;*/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

function NavBar(props) {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
      const { classes } = props;
      const open = Boolean(anchorEl);
      return (
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                      <Menu
            id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
          >
                        <MenuItem>Мои тренеровки</MenuItem>
                        <MenuItem>Мои отчёты</MenuItem>
                      </Menu>
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                      Title
                    </Typography>
                    <Button color="inherit">Login</Button>
                  </Toolbar>
                </AppBar>
              </div>
            );
}

NavBar.propTypes = {
      classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

