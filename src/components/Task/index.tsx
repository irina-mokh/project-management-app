import { Card, Typography } from '@mui/material';
import { DeleteButton } from 'components/DeleteButton';
import { ITask, ITaskDetail } from 'types';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'store/board/actions';
import { moveTask } from 'store/board/reducer';
import { AppDispatch } from 'store';
import React, { useRef, MutableRefObject, useState } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { updateTask } from 'utils/axios';

interface ITaskProps {
  columnId: string;
  boardId: string;
  data: ITask;
  columnOrder: number;
}
export const Task = (props: ITaskProps) => {
  console.log('render task');
  const dispatch: AppDispatch = useDispatch();
  const { columnId, boardId, columnOrder } = props;

  // add state to have columnId and boardId in state of Task
  const [task] = useState<ITaskDetail>({
    ...props.data,
    columnId: columnId,
    boardId: boardId,
    columnOrder: columnOrder,
  });

  // ref for DnD task
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  // Drop task
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: async (item: ITaskDetail) => {
        const dragIndex = item.order;
        const dropIndex = task.order;
        const dragColumnIndex = item.columnOrder;
        const dropColumnIndex = task.columnOrder;

        dispatch(moveTask({ dragIndex, dropIndex, dragColumnIndex, dropColumnIndex }));

        const newTask = {
          title: item.title,
          order: dropIndex,
          description: item.description,
          userId: item.userId,
          boardId: task.boardId,
          columnId: task.columnId,
        };
        await updateTask(newTask, item.id, item.columnId);
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
        order: `${props.data.order}`,
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
