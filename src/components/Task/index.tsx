import { Card, Typography } from '@mui/material';
import { DeleteButton } from 'components/DeleteButton';
import { ITask } from 'types';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'store/board/actions';
import { moveTask } from 'store/board/reducer';
import { AppDispatch } from 'store';
import React, { useRef, MutableRefObject } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { getColumn, getTask, updateTask } from 'utils/axios';

interface ITaskProps {
  columnId: string;
  boardId: string;
  task: ITask;
}
export const Task = (props: ITaskProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { task, columnId, boardId } = props;

  // ref for DnD task
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  // Drop task
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: async (item: ITask, monitor) => {
        console.log(monitor.getItem());
        const dragIndex = item.order;
        const dropIndex = task.order;
        // ?? get drag column order
        const dragColumnDetails = await getColumn(boardId, columnId);
        const dragColumnIndex = dragColumnDetails.order;

        // ?? get drop column Id and order
        // wrong column id
        const dropTaskDetails = await getTask(boardId, columnId, task.id);
        const dropColumnId = dropTaskDetails.columnId;
        const dropColumnDetails = await getColumn(boardId, columnId);

        const dropColumnIndex = dropColumnDetails.order;

        dispatch(moveTask({ dragIndex, dropIndex, dragColumnIndex, dropColumnIndex }));

        const newTask = {
          title: item.title,
          order: dropIndex,
          description: item.description,
          userId: item.userId,
          boardId: boardId,
          columnId: dropColumnId,
        };
        await updateTask(newTask, item.id);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props]
  );
  // Drag task
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'task',
      item: task,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );
  // task Ref
  drag(drop(ref));

  const opacity = isDragging ? 0.5 : 1;

  const isActive = canDrop && isOver;
  let borderColor = 'transparent';
  if (isActive) {
    borderColor = 'teal';
  } else if (canDrop) {
    borderColor = 'gray';
  }

  return (
    <Card
      component="li"
      ref={ref}
      sx={{
        order: `${task.order}`,
        margin: '10px 0',
        padding: '10px',
        position: 'relative',
        border: `1px solid ${borderColor}`,
        zIndex: 5,
        backgroundColor: 'background.default',
        boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.2)',
        opacity: opacity,
      }}
    >
      <Typography variant="h5">{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <DeleteButton
        confirmText="Delete a task?"
        deleteHandler={() => dispatch(deleteTask([boardId, columnId, task.id]))}
      />
    </Card>
  );
};
