import { render, screen } from '@testing-library/react';
import { Task } from 'components/Task';
import { Provider } from 'react-redux';
import { store } from 'store';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const mockTask = {
  columnId: 'some-column-id',
  boardId: 'some-column-id',
  data: {
    id: 'some-task-id',
    title: 'add tests to app',
    order: 1,
    description: 'add some tests to our project management app',
    userId: 'some-user-id',
  },
  columnOrder: 1,
};

const container = (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Task {...mockTask} />
    </DndProvider>
  </Provider>
);

describe('Task', () => {
  it('renders', () => {
    render(container);
    expect(screen.getByTestId('task')).toBeInTheDocument();
  });
  it('has title', () => {
    render(container);
    expect(screen.getByText(/add tests/)).toBeInTheDocument();
  });
  it('has description', () => {
    render(container);
    expect(screen.getByText(/project management/)).toBeInTheDocument();
  });
  it('delete button', () => {
    render(container);
    const elem = screen.getByRole('button');
    expect(elem).toBeInTheDocument();
    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });
});
