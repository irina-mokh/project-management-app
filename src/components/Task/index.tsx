import { Card, Typography } from '@mui/material';
import { DeleteButton } from 'components/DeleteButton';
import { ITask, ITaskDetail } from 'types';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'store/board/actions';
import { moveTask } from 'store/board/reducer';
import { AppDispatch } from 'store';
import { useRef, MutableRefObject, useState, useEffect } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { updateTask } from 'utils/axios';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface ITaskProps {
  columnId: string;
  boardId: string;
  data: ITask;
  columnOrder: number;
  isEmpty?: boolean;
}
export const Task = (props: ITaskProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isPending, setPending] = useState(false);
  let pending = false;
  const { columnId, boardId, columnOrder, isEmpty, data } = props;

  // add state to have columnId and boardId in state of Task
  const [task, setTask] = useState<ITaskDetail>({
    ...props.data,
    columnId: columnId,
    boardId: boardId,
    columnOrder: columnOrder,
  });
  useEffect(() => {
    setPending(pending);
  }, [pending]);

  useEffect(() => {
    setTask({
      ...data,
      columnId: columnId,
      boardId: boardId,
      columnOrder: columnOrder,
    });
  }, [data, boardId, columnId, columnOrder]);

  // ref for DnD task
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  // Drop task
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: async (drag: ITaskDetail) => {
        pending = true;
        const dragIndex = drag.order;
        const dropIndex = task.order;
        const dragColumnIndex = drag.columnOrder;
        const dropColumnIndex = task.columnOrder;

        if (dragColumnIndex === dropColumnIndex && dropIndex === dragIndex) {
          return;
        }
        dispatch(moveTask({ dragIndex, dropIndex, dragColumnIndex, dropColumnIndex }));

        const newTask = {
          title: drag.title,
          order: task.order,
          description: drag.description,
          userId: drag.userId,
          boardId: boardId,
          columnId: task.columnId,
        };

        await updateTask(newTask, drag.id, drag.columnId);
        pending = false;
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
      canDrag: isEmpty ? false : !isPending,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );
  // task Ref
  drag(drop(ref));

  const opacity = isDragging ? 0.2 : 1;

  const isActive = canDrop && isOver;
  let borderColor = 'transparent';
  if (isActive) {
    borderColor = 'teal';
  } else if (canDrop) {
    borderColor = 'gray';
  }

  const backgroundColor = isEmpty ? 'transparent' : 'background.default';
  const height = isEmpty ? '100%' : 'auto';

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const editTaskHandler = () => {
    // добавляем в url id колонки и таска
    searchParams.set('columnId', columnId);
    searchParams.set('taskId', task.id);
    setSearchParams(searchParams);
  };

  return (
    <Card
      data-testid="task"
      component="li"
      ref={ref}
      sx={{
        order: props.data.order,
        height: height,
        margin: '8px 0',
        padding: '10px',
        position: 'relative',
        borderTop: `5px solid ${borderColor}`,
        zIndex: 5,
        backgroundColor: backgroundColor,
        boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.2)',
        opacity: opacity,
        cursor: !isEmpty ? 'pointer' : 'default',
      }}
    >
      <div onClick={editTaskHandler}>
        <Typography variant="h5" fontSize="1.2em" marginBottom="0.5em">
          {task.title}
        </Typography>
        <Typography fontSize="0.9em" fontStyle="italic">
          {task.description}
        </Typography>
      </div>
      {!isEmpty && (
        <DeleteButton
          confirmText={t('deleteTask')}
          deleteHandler={() => dispatch(deleteTask([boardId, columnId, task.id]))}
        />
      )}
    </Card>
  );
};
