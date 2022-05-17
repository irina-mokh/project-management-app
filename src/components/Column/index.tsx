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

  const handleTitleChangeCancel = () => {
    setCurTitle(column.title);
  };

  const inputButtons = isSelected ? (
    <>
      <IconButton onMouseDown={handleTitleChangeCancel}>
        <Clear aria-label="cancel" />
      </IconButton>
      <IconButton
        aria-label="submit"
        onMouseDown={() => dispatch(updateColumn([boardId, column.id, curOrder, curTitle]))}
      >
        <Check />
      </IconButton>
    </>
  ) : (
    <Edit aria-label="edit" sx={{ width: '18px', height: '18px' }} />
  );
  return (
    <Card
      component="li"
      style={{
        marginRight: '1rem',
        height: '100%',
        minWidth: '300px',
        padding: '10px',
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
          style: { fontSize: '1.5rem', fontWeight: 700, padding: '5px', width: '90%' },
          startAdornment: <InputAdornment position="start">{inputButtons}</InputAdornment>,
        }}
      />
      <List
        sx={{
          height: '90%',
          overflowY: 'scroll',
        }}
      >
        {column.tasks.map((task: ITask) => (
          <Task boardId={boardId} columnId={column.id} task={task} key={task.id}></Task>
        ))}
        <AddButton text="add task" />
      </List>
      <DeleteButton
        confirmText="Delete a column?"
        deleteHandler={() => dispatch(deleteColumn([boardId, column.id]))}
      />
    </Card>
  );
};
