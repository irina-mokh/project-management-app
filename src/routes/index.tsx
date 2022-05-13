import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'layout';
import { Main } from 'pages/main';
import { Welcome } from 'pages/welcome';
import { Board } from 'pages/board';
import { EditProfileForm } from 'components/Forms/EditProfileForm';
import { NotFound } from 'pages/notFound';
import { SignUpForm } from 'pages/signUp';
import { SignInForm } from 'pages/signIn';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

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
    title: `${prefixTitle} Sign up`,
    path: 'signup',
    component: <SignUpForm />,
  },
  signIn: {
    title: `${prefixTitle} Sign in`,
    path: 'signin',
    component: <SignInForm />,
  },
  editProfile: {
    title: `${prefixTitle} Edit profile`,
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
  const { token } = useSelector((state: RootState) => state.auth);
  console.log(appRoutes);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes}
      </Route>
      <Route path="/signin" element={token ? <Navigate to="/main" replace /> : <SignInForm />} />
      <Route path="/signup" element={token ? <Navigate to="/main" replace /> : <SignUpForm />} />
    </Routes>
  );
};
