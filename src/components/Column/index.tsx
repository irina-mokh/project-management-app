import { List, Card, TextField, InputAdornment, IconButton } from '@mui/material';
import { IColumn, ITask } from 'types';
import { AddButton } from 'components/AddButton';
import { Clear, Check, Edit } from '@mui/icons-material';
import { AppDispatch } from 'store';
import React, { useState, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { moveColumn } from 'store/board/reducer';
import { deleteColumn } from 'store/board/actions';
import { updateColumn } from 'utils/axios';
import { DeleteButton } from 'components/DeleteButton';
import { Task } from 'components/Task';
import { TaskModal } from 'components/Modals';
import { useTranslation } from 'react-i18next';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

const emptyTask = {
  id: '0',
  title: '',
  order: 1,
  description: '',
  userId: '',
};

interface IColumnProps {
  column: IColumn;
  boardId: string;
}
export const Column = (props: IColumnProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isPending, setPending] = useState(false);

  const { boardId, column } = props;

  const [curTitle, setCurTitle] = useState(column.title);
  const [curOrder] = useState(column.order);
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTitleChangeCancel = () => {
    setCurTitle(column.title);
  };

  // ref for column DnD
  const colRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { t } = useTranslation();

  // Drop column
  const [{ isOver, canDrop }, dropCol] = useDrop(
    () => ({
      accept: 'column',
      drop: async (item: IColumn) => {
        setPending(true);
        const dragIndex = item.order;
        const hoverIndex = props.column.order;
        dispatch(moveColumn({ dragIndex, hoverIndex }));
        updateColumn(boardId, item.id, hoverIndex, item.title).then(() => {
          setPending(false);
        });
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props]
  );

  // Drag column
  const [{ isDragging }, dragCol] = useDrag(
    () => ({
      type: 'column',
      item: column,
      canDrag: !isPending,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag(),
      }),
    }),
    [column]
  );
  // column ref
  dragCol(dropCol(colRef));

  const opacity = isDragging ? 0.5 : 1;

  const isActive = canDrop && isOver;
  let borderColor = 'transparent';
  if (isActive) {
    borderColor = 'teal';
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
        onMouseDown={() => updateColumn(boardId, column.id, curOrder, curTitle)}
      >
        <Check />
      </IconButton>
    </>
  ) : (
    <Edit aria-label="edit" color="disabled" sx={{ width: '0.5em', height: '0.5em' }} />
  );

  return (
    <Card
      component="li"
      ref={colRef}
      sx={{
        order: `${column.order}`,
        marginRight: '1rem',
        height: '100%',
        width: '300px',
        padding: '5px 10px 10px 7px',
        position: 'relative',
        opacity: opacity,
        cursor: 'grab',
        borderLeft: `7px solid ${borderColor}`,
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
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
          overflowY: 'scroll',
          padding: '0 10px 0 0',
          '&::-webkit-scrollbar': {
            width: 7,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            border: '1px solid #bdbdbd4D',
            borderRadius: 2,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbdCC',
            borderRadius: 2,
          },
        }}
      >
        {column.tasks.map((task: ITask) => (
          <Task
            boardId={boardId}
            columnId={column.id}
            data={task}
            key={task.id}
            columnOrder={column.order}
          ></Task>
        ))}
        <AddButton
          text={t('addTask')}
          order={column.tasks.length + 1}
          addHandler={() => setShowModal(true)}
        />
        {column.tasks.length == 0 && (
          <Task
            boardId={boardId}
            columnId={column.id}
            data={emptyTask}
            key="0"
            columnOrder={column.order}
            isEmpty={true}
          ></Task>
        )}
      </List>
      <DeleteButton
        confirmText={t('confirmTextButton')}
        deleteHandler={() => dispatch(deleteColumn([boardId, column.id]))}
      />

      <TaskModal columnId={column.id} isVisible={showModal} setVisible={setShowModal} />
    </Card>
  );
};
