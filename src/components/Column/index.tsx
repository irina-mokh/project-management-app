import {
  List,
  Card,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { IColumn, ITask } from 'types';
import { AddButton } from 'components/AddButton';
import { Clear, Check, Edit } from '@mui/icons-material';
import { AppDispatch } from 'store';
import React, { useState, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { moveColumn } from 'store/board/reducer';
import { updateColumn, deleteColumn } from 'store/board/actions';
import { DeleteButton } from 'components/DeleteButton';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

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

  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const handleTitleChangeCancel = () => {
    setCurTitle(column.title);
  };

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'column',
    drop: (item: IColumn, monitor: DropTargetMonitor) => {
      console.log(item);
      const dragIndex = item.order - 1;
      const hoverIndex = props.column.order - 1;

      dispatch(moveColumn({ dragIndex, hoverIndex }));
      console.log(monitor);
      console.log(item);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'column',
    item: column,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  const isActive = canDrop && isOver;
  let borderColor = 'transparent';
  if (isActive) {
    borderColor = 'red';
  } else if (canDrop) {
    borderColor = 'gray';
  }

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
      ref={ref}
      style={{
        marginRight: '1rem',
        height: '100%',
        minWidth: '300px',
        padding: '5px 15px 10px 15px',
        position: 'relative',
        opacity: opacity,
        cursor: 'grab',
        border: `1px dashed ${borderColor}`,
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
          <Paper component="li" key={task.id} sx={{ margin: '0 0 10px 0', padding: '10px' }}>
            <Typography variant="h5">{task.title}</Typography>
            <Typography>{task.description}</Typography>
          </Paper>
        ))}
        <AddButton text="add task" />
      </List>
      <DeleteButton
        // size="small"
        confirmText="Delete a column?"
        deleteHandler={() => dispatch(deleteColumn([boardId, column.id]))}
      />
    </Card>
  );
};
