import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';

const Week = ({ dayToArray, taskDays, taskInfo }) => {
  const [timeToArray] = useState({
    '00:00': '오전 12:00',
    '01:00': '오전 01:00',
    '02:00': '오전 02:00',
    '03:00': '오전 03:00',
    '04:00': '오전 04:00',
    '05:00': '오전 05:00',
    '06:00': '오전 06:00',
    '07:00': '오전 07:00',
    '08:00': '오전 08:00',
    '09:00': '오전 09:00',
    '10:00': '오전 10:00',
    '11:00': '오전 11:00',
    '12:00': '오후 12:00',
    '13:00': '오후 01:00',
    '14:00': '오후 02:00',
    '15:00': '오후 03:00',
    '16:00': '오후 04:00',
    '17:00': '오후 05:00',
    '18:00': '오후 06:00',
    '19:00': '오후 07:00',
    '20:00': '오후 08:00',
    '21:00': '오후 09:00',
    '22:00': '오후 10:00',
    '23:00': '오후 11:00'
  });

  const timeToTaskRender = (day, time) => {
    const width = 152;
    const height = 70;
    const taskIds = taskDays[day];
    const idsLength = taskIds?.length;

    if (idsLength > 0) {
      let findStartTime = false;
      let taskTitle = '';
      let bgColor = '';
      let diffCount = 0;

      let diffStartTime = null;
      let diffEndTime = null;

      taskIds.forEach(id => {
        if (taskInfo[id].startTime === time) {
          findStartTime = true;
          taskTitle = taskInfo[id].title;
          bgColor = taskInfo[id].color;

          diffStartTime = moment(taskInfo[id].startTime, 'hh:mm');
          diffEndTime = moment(taskInfo[id].endTime, 'hh:mm');

          diffCount = moment.duration(diffEndTime.diff(diffStartTime)).asHours();
        }
      });
      if (findStartTime) {
        return (
          <div
            style={{
              position: 'relative',
              backgroundColor: bgColor,
              width: `${width}px`,
              height: `${height * diffCount + idsLength + diffCount}px`,
              color: 'white'
            }}>
            {diffStartTime.format('h')}-{diffEndTime.format('h A')} <br /> {taskTitle}
          </div>
        );
      }
    }
    return <div></div>;
  };

  return (
    <>
      <Grid container direction='row'>
        {dayToArray.map((item, index) => {
          return (
            <Grid item xs>
              <Grid
                direction='column'
                /*  justifyContent='center'
                  alignItems='center'*/
                className={'calendar-header week-area'}>
                {_.map(timeToArray, (value, key) => {
                  return index === 0 ? (
                    <div
                      item
                      style={{
                        border: '1px solid black',
                        borderLeft: 'none',
                        borderTop: 'none',
                        height: '70px',
                        textAlign: 'center'
                      }}>
                      {value}
                    </div>
                  ) : (
                    <div
                      item
                      style={{
                        border: '1px solid black',
                        borderTop: 'none',
                        height: '70px',
                        textAlign: 'center'
                      }}>
                      {timeToTaskRender(item.format('YYYYMMDD'), key)}
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Week;
