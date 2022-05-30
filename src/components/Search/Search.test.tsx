import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRouter } from 'routes';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/boards']}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MemoryRouter>
  );

  const search = screen.getByPlaceholderText(/search/i);
  // const login = screen.getByLabelText(/login/i);
  // const password = screen.getByLabelText(/password/i);

  return {
    search,
    // page,
    // login,
    // password,
  };
};

describe('Search', () => {
  it('render', async () => {
    const { search } = setup();
    expect(search).toBeInTheDocument();
  });
  it('input search query', async () => {
    const { search } = setup();

    const test = 'Hello, World!';
    userEvent.clear(search);
    userEvent.type(search, test);
    expect(search).toHaveValue(test);
  });
});
