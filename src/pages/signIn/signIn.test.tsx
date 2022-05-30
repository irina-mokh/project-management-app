import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppRouter } from 'routes';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

const setup = () => {
  render(
    <MemoryRouter initialEntries={['/signin']}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MemoryRouter>
  );

  const page = screen.getByTestId('signIn');
  const login = screen.getByLabelText(/login/i);
  const password = screen.getByLabelText(/password/i);

  return {
    page,
    login,
    password,
  };
};

describe('Signin', () => {
  it('render', async () => {
    const { login, page, password } = setup();

    expect(page).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
  it('fill and submit', async () => {
    const { login, password } = setup();

    fireEvent.change(login, { target: { value: 'mokh' } });
    fireEvent.change(password, { target: { value: '007007pswrd' } });
    const submit = screen.getByTestId('submit-signin');
    expect(submit).toBeInTheDocument();

    fireEvent.click(submit);

    await waitFor(() => expect(screen.getByText('Welcome page')).toBeInTheDocument());
  });
});
