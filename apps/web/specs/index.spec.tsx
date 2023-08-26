import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Index', () => {
  const mockFiles = [
    { name: 'file1.txt', type: 'text/plain', size: 1024 },
    { name: 'file2.jpg', type: 'image/jpeg', size: 2048 },
  ];

  const mockStore = configureStore();
  const initialState = { files: mockFiles };

  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={mockStore(initialState)}>
        <Index />
      </Provider>
    );

    expect(baseElement).toBeTruthy();

  });
});
