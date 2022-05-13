import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'layout';
import { Main } from 'pages/main';
import { Welcome } from 'pages/welcome';
import { Board } from 'pages/board';
import { NotFound } from 'pages/notFound';

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
  // signUp: {
  //   title: `${prefixTitle}Sign up`,
  //   path: 'signup',
  //   component: <SignUp />,
  // },
  // signIn: {
  //   title: `${prefixTitle}Sign in`,
  //   path: 'signin',
  //   component: <SignIn />,
  // },
  // editProfile: {
  //   title: `${prefixTitle}Edit profile`,
  //   path: 'edit-profile',
  //   component: <EditProfile />,
  // },
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
    return <Route key={index} {...route} />;
  });
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes}
      </Route>
    </Routes>
  );
};
