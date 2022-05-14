import { render, screen } from '../../../test-utils';
import VerifyEmail from '../VerifyEmail';

describe('verify email component tests', () => {
  test('component mounts successfully', () => {
    render(<VerifyEmail />);
    expect(screen.getByText('Email Verification')).toBeInTheDocument();
  });
});
