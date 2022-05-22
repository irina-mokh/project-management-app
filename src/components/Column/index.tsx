import { List, Card, TextField, InputAdornment, IconButton } from '@mui/material';
import { IColumn, ITask } from 'types';
import { AddButton } from 'components/AddButton';
import { Clear, Check, Edit } from '@mui/icons-material';
import { AppDispatch } from 'store';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateColumn, deleteColumn } from 'store/board/actions';
import { DeleteButton } from 'components/DeleteButton';
import { Task } from 'components/Task';
import { TaskModal } from 'components/Modals';

interface IColumnProps {
  column: IColumn;
  boardId: string;
}
export const Column = (props: IColumnProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { boardId, column } = props;

  const [curTitle, setCurTitle] = useState(column.title);
  const [curOrder] = useState(column.order);
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTitleChangeCancel = () => {
    setCurTitle(column.title);
  };

  const inputButtons = isSelected ? (
    <>
      <IconButton onMouseDown={handleTitleChangeCancel} size="small">
        <Clear aria-label="cancel" />
      </IconButton>
      <IconButton
        aria-label="submit"
        size="small"
        onMouseDown={() => dispatch(updateColumn([boardId, column.id, curOrder, curTitle]))}
      >
        <Check />
      </IconButton>
    </>
  ) : (
    <Edit aria-label="edit" color="disabled" sx={{ width: '0.8em', height: '0.8em' }} />
  );
  return (
    <Card
      component="li"
      style={{
        marginRight: '1rem',
        height: '100%',
        minWidth: '300px',
        padding: '5px 15px 10px 15px',
        position: 'relative',
      }}
    >
      <TextField
        variant="standard"
        value={curTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurTitle(e.target.value);
        }}
        onFocus={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)}
        InputProps={{
          style: { fontSize: '1.5rem', fontWeight: 700, width: '90%', marginBottom: '10px' },
          startAdornment: <InputAdornment position="start">{inputButtons}</InputAdornment>,
        }}
      />
      <List
        sx={{
          height: '90%',
          overflowY: 'scroll',
          padding: '0 10px 0 0',
          '&::-webkit-scrollbar': {
            width: 7,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#7b9c8480',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: 2,
          },
        }}
      >
        {column.tasks.map((task: ITask) => (
          <Task boardId={boardId} columnId={column.id} task={task} key={task.id}></Task>
        ))}
        <AddButton text="add task" addHandler={() => setShowModal(true)} />
      </List>
      <DeleteButton
        // size="small"
        confirmText="Delete a column?"
        deleteHandler={() => dispatch(deleteColumn([boardId, column.id]))}
      />

      <TaskModal columnId={column.id} isVisible={showModal} setVisible={setShowModal} />
    </Card>
  );
};
