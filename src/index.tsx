import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Provider } from "react-redux";
import { store } from "./utils/Redux/Store";

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
