import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


class SmileButtons extends Component {
  render() {
    return (
      <div>
        <IconButton>
          <Icon value={1}>mood_bad</Icon>
        </IconButton>
        <IconButton>
          <Icon value={2}>sentiment_very_dissatisfied</Icon>
        </IconButton>
        <IconButton>
          <Icon value={3}>sentiment_dissatisfied</Icon>
        </IconButton>
        <IconButton>
          <Icon value={4}>sentiment_satisfied_alt</Icon>
        </IconButton>
        <IconButton>
          <Icon value={5}>mood</Icon>
        </IconButton>
      </div>
    )
  }
}

export default SmileButtons;
