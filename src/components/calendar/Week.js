import React from 'react';
import { Grid } from '@material-ui/core';

const Week = ({}) => {
  return (
    <>
      <Grid container className={'calendar-header week-area'}>
        <Grid item xs>
          <div
            name={'dayArea'}
            style={{
              border: '1px solid black',
              borderTop: 'none',
              height: '100px',
              textAlign: 'center'
            }}>
            오전 12:00
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Week;
