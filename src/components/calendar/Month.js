import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { GetRandomColor } from '../../functions';
import produce from 'immer';
import { Grid, Typography } from '@material-ui/core';
import { ModalAddTask } from '../modals';

const Month = ({ firstWeekDays, state, taskDays, taskInfo, setTaskDays, setTaskInfo }) => {
  const [items, setItems] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const temp = [];
    const toDay = moment();

    // 한주 씩 Data Setting 6  * 7
    for (let i = 0; i < 7; i++) {
      const item = {
        isToday: false,
        isMonth: false,
        day: null,
        tasks: null
      };
      const otherDay = moment(firstWeekDays).add('d', i);
      const YYYYMMDD = otherDay.format('YYYYMMDD');

      if (otherDay.isSame(state.calendar, 'month')) {
        // 같은 달 인 경우 Class 셋팅
        if (otherDay.isSame(toDay, 'day')) {
          // 오늘 날짜 인 경우 Class 셋팅
          item.isToday = true;
        }
        item.isMonth = true;
      }
      item.day = otherDay;

      const test = _.map(taskDays[YYYYMMDD], id => {
        return { ...taskInfo[id], taskID: id };
      });
      item.taskID = _.map(_.orderBy(test, ['durationCount'], ['desc']), item => item.taskID);
      temp.push(item);
    }
    setItems(temp);
  }, [firstWeekDays, taskDays, taskInfo]);

  const handleClick = (e, id, day) => {
    const name = e.currentTarget.getAttribute('name');
    if (name === 'task' && id) {
      e.stopPropagation();
    }
    const nextState = {
      ...taskInfo[id],
      startDate: taskInfo[id]?.startDate ? taskInfo[id].startDate : day.format('YYYYMMDD'),
      endDate: taskInfo[id]?.endDate ? taskInfo[id].endDate : day.format('YYYYMMDD'),
      startTime: taskInfo[id]?.startTime ? taskInfo[id].startTime : moment().format('HH:00'),
      endTime: taskInfo[id]?.endTime
        ? taskInfo[id].endTime
        : moment()
            .add(1, 'h')
            .format('HH:00'),
      taskID: id
    };
    setCurrentTask(nextState);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = updateTask => {
    let startDate = null;
    let endDate = null;

    // 시작 날짜 가 종료날짜보다 클 경우 swap
    if (updateTask.startDate > updateTask.endDate) {
      const temp = updateTask.startDate;
      updateTask.startDate = updateTask.endDate;
      updateTask.endDate = temp;
    }
    // 시작 시간 이 종료시간보다 클 경우 swap
    const diffStartTime = moment(updateTask.startTime, 'hh:mm');
    const diffEndTime = moment(updateTask.endTime, 'hh:mm');

    if (moment.duration(diffEndTime.diff(diffStartTime)).asMinutes() < 0) {
      const temp = updateTask.startTime;
      updateTask.startTime = updateTask.endTime;
      updateTask.endTime = temp;
    }
    const updateStartDate = moment(updateTask.startDate);
    const updateEndDate = moment(updateTask.endDate);

    let currentStartDate = null;
    let currentEndDate = null;

    if (updateTask.taskID) {
      currentStartDate = moment(currentTask.startDate);
      currentEndDate = moment(currentTask.endDate);
      if (currentStartDate <= updateStartDate) {
        startDate = currentStartDate;
      } else {
        startDate = updateStartDate;
      }

      if (currentEndDate <= updateEndDate) {
        endDate = updateEndDate;
      } else {
        endDate = currentEndDate;
      }
    } else {
      updateTask.taskID = Math.random()
        .toString(36)
        .substr(2, 10);
      updateTask.color = GetRandomColor();

      startDate = updateStartDate;
      endDate = updateEndDate;
    }

    const duration = moment.duration(startDate.diff(endDate));
    const durationCount = -duration.asDays();

    const temp = _.cloneDeep(taskDays);

    for (let i = 0; i <= durationCount; i++) {
      const otherDay = moment(startDate).add('d', i);

      if (currentStartDate <= otherDay && otherDay <= currentEndDate) {
        const findIndex = temp[otherDay.format('YYYYMMDD')]?.indexOf(updateTask.taskID);
        if (otherDay < updateStartDate) {
          temp[otherDay.format('YYYYMMDD')]?.splice(findIndex, 1);
        } else {
          if (otherDay > updateEndDate) {
            temp[otherDay.format('YYYYMMDD')]?.splice(findIndex, 1);
          }
        }
      } else {
        if (otherDay >= updateStartDate && otherDay <= updateEndDate) {
          if (_.isEmpty(temp[otherDay.format('YYYYMMDD')])) {
            temp[otherDay.format('YYYYMMDD')] = [];
          }
          temp[otherDay.format('YYYYMMDD')].push(updateTask.taskID);
        }
      }
    }
    const nextState = produce(taskInfo, draft => {
      draft[updateTask.taskID] = produce(updateTask, draft => {
        draft.durationCount = durationCount;
      }); /*updateTask;*/
    });
    setTaskDays(temp);
    setTaskInfo(nextState);
    setModalOpen(false);
  };

  const handleRemove = () => {
    const currentStartDate = moment(currentTask.startDate);
    const currentEndDate = moment(currentTask.endDate);

    const duration = moment.duration(currentStartDate.diff(currentEndDate));
    const durationCount = -duration.asDays();

    setTaskDays(
      produce(taskDays, draft => {
        for (let i = 0; i <= durationCount; i++) {
          const otherDay = moment(currentStartDate).add('d', i);
          const findIndex = draft[otherDay.format('YYYYMMDD')]?.indexOf(currentTask.taskID);
          draft[otherDay.format('YYYYMMDD')]?.splice(findIndex, 1);
        }
      })
    );
    setTaskInfo(
      produce(taskInfo, draft => {
        delete draft[currentTask.taskID];
      })
    );
    setModalOpen(false);
  };

  return (
    <>
      <Grid container className={'calendar-header week-area'}>
        {_.map(items, (value, key, i) => {
          return (
            <Grid item xs>
              <div
                name={'dayArea'}
                onClick={event => handleClick(event, undefined, value.day)}
                style={{
                  border: '1px solid black',
                  borderTop: 'none',
                  height: '200px',
                  textAlign: 'center'
                }}>
                <Typography
                  className={
                    value.isMonth && value.isToday
                      ? 'today'
                      : value.isMonth
                      ? 'currentMonth'
                      : 'otherMonth'
                  }>
                  {value.day.format('D')}
                </Typography>

                {/*
                   NOTE 세로 Task Component Area
                */}
                {!_.isEmpty(value.taskID) &&
                  value.taskID.map((id, index) => {
                    return (
                      <div
                        name={'task'}
                        className={'task'}
                        style={{ position: 'relative', marginRight: '-2px' }}
                        onClick={event => handleClick(event, id)}
                        style={{ backgroundColor: taskInfo[id]?.color }}>
                        {taskInfo[id]?.startDate === value.day.format('YYYYMMDD') && (
                          <>
                            <Typography style={{ color: '#ffffff' }}>
                              {taskInfo[id]?.title}
                            </Typography>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            </Grid>
          );
        })}
      </Grid>
      <ModalAddTask
        selectedItem={{ ...currentTask }}
        modalOpen={modalOpen}
        handleClose={handleClose}
        handleSave={handleSave}
        handleRemove={handleRemove}
      />
    </>
  );
};

export default Month;
