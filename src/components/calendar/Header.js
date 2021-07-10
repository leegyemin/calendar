import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import _ from 'lodash';

const dateToArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CalendarHeader = ({ state, dayToArray }) => {
  const [weekDateToArray] = useState(['', ...dateToArray]);
  const [monthDateToArray] = useState([...dateToArray]);

  const isWeek = state.toggleGroup === 'Week';

  const toArray = isWeek ? weekDateToArray : monthDateToArray;
  const sunIdx = isWeek ? 1 : 0;
  const satIndex = isWeek ? 7 : 6;

  return (
    <>
      <Grid container className={'calendar-header'}>
        {toArray.map((item, index) => {
          return (
            <>
              <Grid item xs>
                <div
                  style={{
                    color: index === sunIdx ? 'red' : index === satIndex ? 'blue' : undefined,
                    border: '1px solid black',
                    borderTop: 'none',
                    height: '50px',
                    textAlign: 'center'
                  }}>
                  {item}
                  {state.toggleGroup === 'Week' && !_.isEmpty(dayToArray) && index > 0 && (
                    <>
                      <br />
                      {dayToArray[index].format('D')}
                    </>
                  )}
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
