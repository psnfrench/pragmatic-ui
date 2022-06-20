/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideBar } from './SideBar';
// import { ReactComponent as DMExpanded } from '../images/DMExpanded.svg';
// import { ReactComponent as DMCollapsed } from '../images/DMCollapsed.svg';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';

describe('Togggling the collapsed state', () => {
  it('defaults to expanded', async () => {
    render(
      <SideBar
        logoCollapsed={<LogoDevIcon data-testid="collapsedSvg" />}
        logoExpanded={<LogoDevIcon data-testid="expandedSvg" />}
        items={[
          { text: 'Text Inputs', key: 'textInput', icon: <InputIcon />, divider: true },
          {
            text: 'Sign Up Form',
            key: 'signUp',
            icon: <LoginIcon />,
            onClick: () => console.log('sign up clicked'),
          },
        ]}
      ></SideBar>,
    );

    const collapsedSvg: HTMLElement = screen.queryByTestId('collapsedSvg');
    const expandedSvg: HTMLElement = screen.queryByTestId('expandedSvg');
    expect(expandedSvg).toBeInTheDocument();
    expect(collapsedSvg).not.toBeInTheDocument();

    userEvent.click(expandedSvg);

    await waitFor(() => {
      expect(screen.queryByTestId('collapsedSvg')).toBeInTheDocument();
      expect(screen.queryByTestId('expandedSvg')).not.toBeInTheDocument();
    });
  });
});
