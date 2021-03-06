import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Month from './Month';
import Week from './Week';
import CalendarHeader from './Header';

const Index = ({ state, ...rest }) => {
  const [firstWeekDays, setFirstWeekDays] = useState([]);
  const [dayToArray, setDayToArray] = useState([]);

  useEffect(() => {
    const firstDayOfMonth = moment(state.calendar).startOf('month'); // 해당 월의 1일의 Index 객체
    const firstDateOfMonth = firstDayOfMonth.get('d'); // 첫번째 주 1일의 index (7월 1일의 인덱스 = 4)

    // const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth); // ex) 6월 27일

    const temp = [];
    for (let i = 0; i < 6; i++) {
      let index = i * 7 - firstDateOfMonth;
      temp.push(firstDayOfMonth.clone().add('d', index));
    }
    setFirstWeekDays(temp);
  }, [state]);

  useEffect(() => {
    if (state.week) {
      const temp = [];
      temp.push(null);
      for (let i = 0; i < 7; i++) {
        const otherDay = state.week.clone().add('d', i);
        temp.push(otherDay);
      }
      setDayToArray(temp);
    }
  }, [state.week]);

  return (
    <div>
      <CalendarHeader state={state} dayToArray={dayToArray} {...rest} />
      {state.toggleGroup === 'Month' ? (
        firstWeekDays.map(item => {
          return <Month firstWeekDays={item} state={state} {...rest} />;
        })
      ) : (
        <Week dayToArray={dayToArray} {...rest}></Week>
      )}
    </div>
  );
};

export default Index;
