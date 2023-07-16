import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'layout';
import { Main } from 'pages/main';
import { Welcome } from 'pages/welcome';
import { Board } from 'pages/board';
import { NotFound } from 'pages/notFound';
import { SignUpForm } from 'pages/signUp';
import { SignInForm } from 'pages/signIn';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { EditProfile } from 'pages/editProfile';

const prefixTitle = 'PMA';
export const routes = {
  welcome: {
    title: `${prefixTitle} Welcome page`,
    path: '/',
    element: <Welcome />,
  },
  main: {
    title: `${prefixTitle} Main page`,
    path: 'boards',
    element: <Main />,
  },
  signUp: {
    title: `${prefixTitle} Sign up`,
    path: 'signup',
    element: <SignUpForm />,
  },
  signIn: {
    title: `${prefixTitle} Sign in`,
    path: 'signin',
    element: <SignInForm />,
  },
  editProfile: {
    title: `${prefixTitle} Edit profile`,
    path: 'edit-profile',
    element: <EditProfile />,
  },
  board: {
    title: `${prefixTitle} Board`,
    path: 'boards/:id',
    element: <Board />,
  },
  notFound: {
    title: `${prefixTitle} Not found`,
    path: '*',
    element: <NotFound />,
  },
};

export const PrivateRoute = ({ token }: { token: string | null }) => {
  if (!token) {
    return <Navigate to={routes.welcome.path} replace />;
  }
  return <Outlet />;
};

export const CommonRoute = ({ token }: { token: string | null }) => {
  if (token) {
    return <Navigate to={routes.main.path} replace />;
  }
  return <Outlet />;
};
export const AppRouter = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route element={<PrivateRoute token={token} />}>
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="/boards" element={<Main />} />
          <Route path="/boards/:id" element={<Board />} />
        </Route>
        <Route element={<CommonRoute token={token} />}>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/boards/:id" element={<Board />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
