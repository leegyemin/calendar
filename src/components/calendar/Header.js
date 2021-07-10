import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

const CalendarHeader = ({ state }) => {
  const [dateToArray] = useState([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]);

  const [dayToArray, setDayToArray] = useState([]);
  useEffect(() => {
    if (state.week) {
      const temp = [];
      for (let i = 0; i < 7; i++) {
        const otherDay = state.week.clone().add('d', i);
        temp.push(otherDay.format('D'));
      }
      setDayToArray(temp);
    }
  }, [state.week]);

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
                  {state.toggleGroup === 'Week' && (
                    <>
                      <br />
                      {dayToArray[index]}
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
