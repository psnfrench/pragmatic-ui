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
import React, { useMemo } from 'react';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

describe('Togggling the collapsed state', () => {
  it('defaults to expanded', async () => {
    const handleSubmitMock = jest.fn();
    render(
      <SideBar
        logoCollapsed={<LogoDevIcon data-testid="collapsedSvg" />}
        logoExpanded={<LogoDevIcon data-testid="expandedSvg" />}
        items={[
            {
              text: 'Home',
              key: 'home',
              icon: <HomeIcon data-testid="link1" />,
              onClick: handleSubmitMock,
              divider: true,
            },
            {
              text: 'Border Radius',
              key: 'borderRadius',
              icon: <BorderStyleIcon data-testid="link2" />,
              onClick: handleSubmitMock,
            },
            {
              text: 'Text Inputs', key: 'textInput', icon: <InputIcon data-testid="link3" />,
              onClick: handleSubmitMock,
            },
            {
              text: 'Sign Up Form',
              key: 'signup',
              icon: <LoginIcon data-testid="link4" />,
              onClick: handleSubmitMock,
            },
            {
              text: 'Snackbar',
              key: 'snackbar',
              icon: <EggAltIcon data-testid="link5" />,
              onClick: handleSubmitMock,
            },
            {
              text: 'Confirmation',
              key: 'confirmation',
              icon: <CheckCircleIcon data-testid="link6" />,
              onClick: handleSubmitMock,
            },
          ]}
      ></SideBar>,
    );

    const collapsedSvg: HTMLElement = screen.queryByTestId('collapsedSvg');
    const expandedSvg: HTMLElement = screen.queryByTestId('expandedSvg');
    const link1: HTMLElement = screen.queryByTestId('link1');
    const link2: HTMLElement = screen.queryByTestId('link2');
    const link3: HTMLElement = screen.queryByTestId('link3');
    const link4: HTMLElement = screen.queryByTestId('link4');
    const link5: HTMLElement = screen.queryByTestId('link5');
    const link6: HTMLElement = screen.queryByTestId('link6');

    expect(expandedSvg).toBeInTheDocument();
    expect(collapsedSvg).not.toBeInTheDocument();
    expect(screen.queryByTestId('link1')).toBeInTheDocument();

    userEvent.click(expandedSvg);

    await waitFor(() => {
      expect(screen.queryByTestId('collapsedSvg')).toBeInTheDocument();
      expect(screen.queryByTestId('expandedSvg')).not.toBeInTheDocument();
    });

    userEvent.click(link1);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    });

    userEvent.click(link2);
    userEvent.click(link3);
    userEvent.click(link4);
    userEvent.click(link5);
    userEvent.click(link6);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledTimes(6);
    });

  });
});
