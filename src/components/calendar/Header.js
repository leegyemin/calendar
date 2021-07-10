import React from 'react';
import { Grid } from '@material-ui/core';

const CalendarHeader = ({}) => {
  const [dateToArray] = React.useState([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]);
  return (
    <>
      <Grid container className={'calendar-header'}>
        {dateToArray.map((item, index) => {
          return (
            <>
              <Grid item xs>
                <div
                  style={{
                    color: index === 0 ? 'red' : index === 6 ? 'blue' : undefined,
                    border: '1px solid black',
                    borderTop: 'none',
                    height: '50px',
                    textAlign: 'center'
                  }}>
                  {item}
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default CalendarHeader;
