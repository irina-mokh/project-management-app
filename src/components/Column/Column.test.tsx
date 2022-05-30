import { render, screen } from '@testing-library/react';
import { Column } from 'components/Column';
import { Provider } from 'react-redux';
import { store } from 'store';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const mockColumn = {
  column: {
    id: 'column id',
    title: 'Pets',
    order: 1,
    tasks: [
      {
        id: '01',
        title: 'feed the cat',
        order: 1,
        description: '15gr',
        userId: 'some-user-id',
      },
      {
        id: '02',
        title: 'feed the dog',
        order: 2,
        description: 'feed the dog',
        userId: 'some-user-id',
      },
    ],
  },
  boardId: 'some-board-id',
};

const container = (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Column {...mockColumn} />
    </DndProvider>
  </Provider>
);

describe('Column', () => {
  render(container);
  it('renders', () => {
    expect(screen.getByTestId('column')).toBeInTheDocument();
  });
  it('gets title', () => {
    render(container);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Pets');
  });
  it('gets 2 tasks', () => {
    render(container);
    const tasks = screen.getAllByTestId('task');
    expect(tasks.length).toBe(2);
  });
});
