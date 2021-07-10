import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

const dateToArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CalendarHeader = ({ state }) => {
  const [weekDateToArray] = useState(['', ...dateToArray]);
  const [monthDateToArray] = useState([...dateToArray]);
  const [dayToArray, setDayToArray] = useState([]);

  useEffect(() => {
    // NOTE Month Change 될 경우 월에 해당하는 Task 만 Filter
    console.log('Month Change');
  }, [state.calendar]);

  useEffect(() => {
    if (state.week) {
      const temp = [];
      temp.push('');
      for (let i = 0; i < 7; i++) {
        const otherDay = state.week.clone().add('d', i);
        temp.push(otherDay.format('D'));
      }
      setDayToArray(temp);
    }
  }, [state.week]);

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
