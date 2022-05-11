import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'layout';
import { Main } from 'pages/main';
import { Welcome } from 'pages/welcome';
import { Board } from 'pages/board';
import { SignUpForm } from 'components/LoginForms/SignUpForm';
import { SignInForm } from 'components/LoginForms/SignInForm';
import { EditProfileForm } from 'components/Forms/EditProfileForm';
import { NotFound } from 'pages/notFound';

const prefixTitle = 'PMA';
export const routes = {
  welcome: {
    title: `${prefixTitle} Welcome page`,
    path: '/',
    component: <Welcome />,
  },
  main: {
    title: `${prefixTitle} Main page`,
    path: 'main',
    component: <Main />,
  },
  signUp: {
    title: `${prefixTitle}Sign up`,
    path: 'signup',
    component: <SignUpForm />,
  },
  signIn: {
    title: `${prefixTitle}Sign in`,
    path: 'signin',
    component: <SignInForm />,
  },
  editProfile: {
    title: `${prefixTitle}Edit profile`,
    path: 'edit-profile',
    component: <EditProfileForm />,
  },
  board: {
    title: `${prefixTitle} Board`,
    path: 'boards/:id',
    component: <Board />,
  },
  notFound: {
    title: `${prefixTitle} Not found`,
    path: '*',
    component: <NotFound />,
  },
};

export const AppRouter = () => {
  const appRoutes = Object.values(routes).map((route, index) => {
    return <Route key={index} path={route.path} element={route.component} />;
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
