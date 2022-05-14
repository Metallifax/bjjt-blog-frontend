import { render, screen } from '../../../test-utils';
import VerifyEmailPrompt from '../VerifyEmailPrompt';

describe('verify email prompt page', () => {
  test('component renders', () => {
    render(<VerifyEmailPrompt />);
    expect(screen.getByText('Please check your email')).toBeInTheDocument();
  });
});
