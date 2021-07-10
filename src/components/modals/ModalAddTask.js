import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  TextField,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';

import { DialogActions, DialogContent, DialogTitle } from './';
import moment from 'moment';
import _ from 'lodash';

const ModalAddTask = ({
  selectedItem,
  modalOpen,
  handleClose,
  handleSave,
  handleRemove,
  isEdit = selectedItem.taskID
}) => {
  const [selectedTask, setSelectedTask] = React.useState(null);

  useEffect(() => {
    setSelectedTask(selectedItem);
  }, [selectedItem]);

  const handleChange = event => {
    const $el = event.target;
    const name = $el.name;
    const value = $el.value;
    setSelectedTask({
      ...selectedTask,
      [name]: event.target.type === 'date' ? value.replace(/-/gi, '') : value
    });
  };

  const buttonDisable = () => {
    return (
      _.isEmpty(selectedTask?.endDate) ||
      _.isEmpty(selectedTask?.endTime) ||
      _.isEmpty(selectedTask?.startDate) ||
      _.isEmpty(selectedTask?.startTime) ||
      _.isEmpty(selectedTask?.title)
    );
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          일정 {isEdit ? '수정하기' : '만들기'}
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete='off'>
            <Table className='table table-bordered'>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      label='일정 제목을 입력하세요.'
                      autoComplete='off'
                      name='title'
                      variant='outlined'
                      size='small'
                      fullWidth
                      value={selectedTask?.title ? selectedTask.title : ''}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '50%' }}>
                    <TextField
                      id='date'
                      label='시작날짜'
                      type='date'
                      name={'startDate'}
                      style={{ width: '100%' }}
                      value={
                        selectedTask?.startDate
                          ? moment(selectedTask.startDate).format('YYYY-MM-DD')
                          : ''
                      }
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell style={{ width: '50%' }}>
                    <TextField
                      id='date'
                      label='시작시간'
                      type='time'
                      style={{ width: '100%' }}
                      name={'startTime'}
                      value={selectedTask?.startTime ? selectedTask.startTime : ''}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '50%' }}>
                    <TextField
                      id='date'
                      label='종료날짜'
                      type='date'
                      style={{ width: '100%' }}
                      name={'endDate'}
                      value={
                        selectedTask?.endDate
                          ? moment(selectedTask.endDate).format('YYYY-MM-DD')
                          : ''
                      }
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell style={{ width: '50%' }}>
                    <TextField
                      id='date'
                      label='종료시간'
                      type='time'
                      name={'endTime'}
                      style={{ width: '100%' }}
                      value={selectedTask?.endTime ? selectedTask.endTime : ''}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={handleClose}>
            취소
          </Button>
          {isEdit && (
            <Button variant={'contained'} disabled={buttonDisable()} onClick={handleRemove}>
              삭제
            </Button>
          )}
          <Button
            variant={'contained'}
            color={'secondary'}
            disabled={buttonDisable()}
            onClick={() => handleSave(selectedTask)}>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ModalAddTask.defaultProps = {
  modalOpen: false
};

export default ModalAddTask;
