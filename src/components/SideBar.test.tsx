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
import React, { SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

describe('Togggling the collapsed state', () => {
  it('defaults to expanded', async () => {
    const navigate = useNavigate();
    render(
      <SideBar
        logoCollapsed={<LogoDevIcon data-testid="collapsedSvg" />}
        logoExpanded={<LogoDevIcon data-testid="expandedSvg" />}
        items={useMemo(
          () => [
            {
              text: 'Home',
              key: 'home',
              icon: <HomeIcon />,
              onClick: () => navigate('/'),
              divider: true,
            },
            {
              text: 'Border Radius',
              key: 'borderRadius',
              icon: <BorderStyleIcon />,
              onClick: () => navigate('/border-radius'),
            },
            {
              text: 'Text Inputs', key: 'textInput', icon: <InputIcon />,
              onClick: () => navigate('/demos'),
            },
            {
              text: 'Sign Up Form',
              key: 'signup',
              icon: <LoginIcon />,
              onClick: () => navigate('/signup'),
            },
            {
              text: 'Snackbar',
              key: 'snackbar',
              icon: <EggAltIcon />,
              onClick: () => navigate('/snackbar'),
            },
            {
              text: 'Confirmation',
              key: 'confirmation',
              icon: <CheckCircleIcon />,
              onClick: () => navigate('/confirmation'),
            },
          ],
          [],
        )}
        setOpen={(value: SetStateAction<boolean>): boolean => true}
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
