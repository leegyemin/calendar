import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
// TODO
const Week = ({ state }) => {
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
    '23:00': '오후 11:00',
    '12:00': '오후 12:00'
  });
  const [test] = useState([
    '',
    '20210627',
    '20210628',
    '20210629',
    '20210630',
    '20210701',
    '20210702',
    '20210703'
  ]);
  const test1 = 1;
  const test2 = 2;
  const test3 = 4;
  return (
    <>
      <Grid container direction='row'>
        {test.map((item, index) => {
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
                      {item === '20210628' && key === '06:00' ? (
                        <div
                          style={{
                            backgroundColor: 'red',
                            width: '100%',
                            height: '100%',
                            color: 'white'
                          }}>
                          {' '}
                          6-7 AM <br /> Task1
                        </div>
                      ) : (
                        ' '
                      )}
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
