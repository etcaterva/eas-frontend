import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'material-ui';

import Number from './Number/Number';
import Letter from './Letter/Letter';
import BackArrow from '../BackArrow/BackArrow';

import STYLES from './Draw.scss';

const Draw = () => (
  <Grid container>
    <BackArrow />
    <div className={STYLES.Draw}>
      <Route path="/number" component={props => <Number {...props} />} />
      <Route path="/letter" component={props => <Letter {...props} />} />
    </div>
  </Grid>
);

export default Draw;

export const urls = '/(number|letter)?';
