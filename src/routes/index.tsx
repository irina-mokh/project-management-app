import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'layout';
import { Main } from 'pages/main';
import { Welcome } from 'pages/welcome';
import { Board } from 'pages/board';
import { EditProfileForm } from 'components/Forms/EditProfileForm';
import { NotFound } from 'pages/notFound';
import { SignUpForm } from 'pages/signUp';
import { SignInForm } from 'pages/signIn';

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
    element: <EditProfileForm />,
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

export const AppRouter = () => {
  const appRoutes = Object.values(routes).map((route, index) => {
    return <Route key={index} path={route.path} element={route.element} />;
  });
  console.log(appRoutes);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes}
      </Route>
    </Routes>
  );
};
