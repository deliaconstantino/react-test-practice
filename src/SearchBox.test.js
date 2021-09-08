import React from 'react';
import { render, screen } from '@testing-library/react';

import SearchBox from './SearchBox';

describe('SearchBox', () => {
  test('renders SearchBox component', () => {
    render(<SearchBox />);

    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});