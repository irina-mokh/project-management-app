import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'layout';
import { Main } from 'pages/main';
import { Welcome } from 'pages/welcome';
import { Board } from 'pages/board';
import { NotFound } from 'pages/notFound';

const prefixTitle = 'Project management app';
export const routes = {
  welcome: {
    title: `${prefixTitle}Welcome page`,
    path: '/',
    element: <Welcome />,
  },
  main: {
    title: `${prefixTitle}Main page`,
    path: 'main',
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
    title: `${prefixTitle}board`,
    path: 'boards/:key',
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
    document.title = route.title;
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
