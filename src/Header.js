import React, { useEffect } from 'react';
import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

const Header = ({ state, setState }) => {
  useEffect(() => {
    if (state.toggleGroup !== 'Month') {
      const firstDayOfMonth = moment(state.calendar).startOf('month'); // 해당 월의 1일의 Index 객체
      const firstDateOfMonth = firstDayOfMonth.get('d'); // 첫번째 주 1일의 index (7월 1일의 인덱스 = 4)

      setState({
        ...state,
        week: firstDayOfMonth.clone().add('d', -firstDateOfMonth)
      });
    }
  }, [state.toggleGroup]);

  const handleChange = (e, value) => {
    const name = e.currentTarget.name;

    let nextWeek = null;
    let otherCaelndar = null;

    if (state.toggleGroup === 'Month') {
      otherCaelndar = state.calendar.clone().add(value, 'M');
    } else {
      let n1 = 7;
      let n2 = 6;
      if (Math.sign(value) === -1) {
        n1 = n1 * -1;
        n2 = n1 - 1;
      }
      nextWeek = state.week.clone().add('d', n1);
      otherCaelndar = nextWeek.clone().add('d', n2);
    }
    setState({
      ...state,
      week: nextWeek ? nextWeek : state.week,
      [name]:
        otherCaelndar.format('YYYYMM') !== state.calendar.format('YYYYMM')
          ? otherCaelndar
          : state.calendar
    });
  };

  const handleChangeToday = () => {
    setState({
      ...state,
      toggleGroup: 'Month',
      calendar: moment()
    });
  };

  const handlToggle = (e, newAlignment) => {
    const name = e.currentTarget.name;
    if (newAlignment !== null) {
      setState({
        ...state,
        [name]: newAlignment
      });
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={2} style={{ textAlign: 'center' }}>
        <Button size='small' variant='outlined' color='primary' onClick={handleChangeToday}>
          오늘
        </Button>
      </Grid>
      <Grid item xs={12} md={6} lg={8} style={{ textAlign: 'center' }}>
        <Typography variant='h5' className='text-primary'>
          <IconButton aria-label='delete' name={'calendar'} onClick={e => handleChange(e, -1)}>
            <ArrowBackIosIcon fontSize='large' />
          </IconButton>
          {state.toggleGroup === 'Month'
            ? state.calendar.format('YYYY년 MM월')
            : state.week
            ? `${state.week.format('YYYY년 MM월 DD일')} ~ ${state.week
                .clone()
                .add('d', 6)
                .format('YYYY년 MM월 DD일')}`
            : null}
          <IconButton aria-label='delete' name={'calendar'} onClick={e => handleChange(e, +1)}>
            <ArrowForwardIosIcon fontSize='large' />
          </IconButton>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={2} style={{ textAlign: 'center' }}>
        <ToggleButtonGroup
          name={'toggleGroup'}
          value={state.toggleGroup}
          exclusive
          onChange={handlToggle}
          size='small'>
          <ToggleButton name={'toggleGroup'} value='Month' aria-label='월' style={{ width: 50 }}>
            월
          </ToggleButton>
          <ToggleButton name={'toggleGroup'} value='Week' aria-label='주' style={{ width: 50 }}>
            주
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Header;
