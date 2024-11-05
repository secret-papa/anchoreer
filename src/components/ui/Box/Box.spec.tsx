import { describe, beforeEach, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Box } from './Box';

describe('<Box />', () => {
  beforeEach(() => {
    render(<Box>Test</Box>);
  });

  it('render correctly', () => {
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
