import React, { useEffect, useState } from 'react';
import './css/App.css';
import Header from './Header';
import Calendar from './components/calendar';
import { Grid, Container, Typography } from '@material-ui/core';
import moment from 'moment';

const App = () => {
  const [state, setState] = useState({
    calendar: moment(),
    week: null,
    today: moment(),
    toggleGroup: 'Month'
  });

  const [taskDays, setTaskDays] = useState({
    /*'20210627': ['task4'],
    '20210628': ['task4'],
    '20210629': ['task4'],
    '20210708': ['task1', 'task2'],
    '20210709': ['task1'],
    '20210710': ['task1', 'task3'],
    '20210711': ['task3'],
    '20210712': ['task3']*/
  });

  const [taskInfo, setTaskInfo] = useState({
    /*  task1: {
      title: '7월 Task111',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      startDate: '20210708',
      endDate: '20210710',
      startTime: '08:00',
      endTime: '13:00',
      durationCount: 2
    },
    task2: {
      title: '7월 Task222',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      startDate: '20210708',
      endDate: '20210708',
      startTime: '08:00',
      endTime: '13:00',
      durationCount: 0
    },
    task3: {
      title: '7월 Task333',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      startDate: '20210710',
      endDate: '20210712',
      startTime: '08:00',
      endTime: '13:00',
      durationCount: 2
    },
    task4: {
      title: '6월 Task',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      startDate: '20210627',
      endDate: '20210629',
      startTime: '08:00',
      endTime: '13:00',
      durationCount: 2
    }*/
  });

  return (
    <>
      <Container maxWidth='lg'>
        <div style={{}}>
          <Header state={state} setState={setState} />
          <Calendar
            state={state}
            taskDays={taskDays}
            taskInfo={taskInfo}
            setTaskDays={setTaskDays}
            setTaskInfo={setTaskInfo}
          />
        </div>
      </Container>
    </>
  );
};

export default App;
