import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

describe('App', () => {
  test('render without crash', async () => {
    render(<App />);
  });
});
