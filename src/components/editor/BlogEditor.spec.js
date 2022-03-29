import React from 'react';
import { render, screen } from '../../test-utils';
import BlogEditor from './BlogEditor';

describe('BlogEditor component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(<BlogEditor />);

    const editor = screen.getByLabelText('rdw-wrapper');
    expect(editor).toBeInTheDocument();
  });
});
