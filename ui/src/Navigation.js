import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/LibraryAdd';
import SendIcon from '@material-ui/icons/Send';

import { Link } from 'react-router-dom';

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

class NavBar extends React.Component {
  state = {
    menu: false,
    redirectPath: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      menu: open,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
       <AppBar position="static">
         <Toolbar>
           <IconButton
              className={classes.menuButton}
              aria-haspopup="true"
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}>
              <MenuIcon />
           </IconButton>
           <Typography variant="title" color="inherit" className={classes.flex}>
             Ski Journal
           </Typography>
         </Toolbar>
       </AppBar>
      <Drawer open={this.state.menu} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
          <div>
            <ListItem button component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Дневник" />
            </ListItem>

            <ListItem button component={Link} to="/add">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Добавить"/>
            </ListItem>
          </div>
          </div>
      </Drawer>
     </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
