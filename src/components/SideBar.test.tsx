/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideBar, SideBarProps } from './SideBar';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import React from 'react';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import EggAltIcon from '@mui/icons-material/EggAlt';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BrowserRouter } from 'react-router-dom';

const TestSideBar = ({
  onClick,
  SideBarProps,
}: {
  onClick?: () => void;
  SideBarProps?: Omit<SideBarProps, 'items' | 'logoExpanded' | 'logoCollapsed'>;
}) => {
  return (
    <SideBar
      logoCollapsed={<LogoDevIcon data-testid="collapsedSvg" />}
      logoExpanded={<LogoDevIcon data-testid="expandedSvg" />}
      items={[
        {
          text: 'Home',
          key: 'home',
          icon: <HomeIcon data-testid="link1" />,
          onClick: onClick,
          divider: true,
        },
        {
          text: 'Border Radius',
          key: 'borderRadius',
          icon: <BorderStyleIcon data-testid="link2" />,
          onClick: onClick,
        },
        {
          text: 'Text Inputs',
          key: 'textInput',
          icon: <InputIcon data-testid="link3" />,
          onClick: onClick,
        },
        {
          text: 'Sign Up Form',
          key: 'signup',
          icon: <LoginIcon data-testid="link4" />,
          onClick: onClick,
        },
        {
          text: 'Snackbar',
          key: 'snackbar',
          icon: <EggAltIcon data-testid="link5" />,
          onClick: onClick,
        },
        {
          text: 'Confirmation',
          key: 'confirmation',
          icon: <CheckCircleIcon data-testid="link6" />,
          onClick: onClick,
        },
      ]}
      {...SideBarProps}
    ></SideBar>
  );
};

describe('Togggling the collapsed state', () => {
  it('defaults to expanded, and collapses when clicked', async () => {
    const handleSubmitMock = jest.fn();
    render(
      <BrowserRouter>
        <TestSideBar onClick={handleSubmitMock} />
      </BrowserRouter>,
    );

    const collapsedSvg: HTMLElement | null = screen.queryByTestId('collapsedSvg');
    const expandedSvg: HTMLElement | null = screen.queryByTestId('expandedSvg');
    const link1: HTMLElement | null = screen.queryByTestId('link1');

    expect(expandedSvg).toBeInTheDocument();
    expect(collapsedSvg).not.toBeInTheDocument();
    expect(screen.queryByTestId('link1')).toBeInTheDocument();

    if (expandedSvg) {
      userEvent.click(expandedSvg);
    }

    await waitFor(() => {
      expect(screen.queryByTestId('collapsedSvg')).toBeInTheDocument();
      expect(screen.queryByTestId('expandedSvg')).not.toBeInTheDocument();
    });

    if (link1) {
      userEvent.click(link1);
    }

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    });
  });
  it('is collapsed when defaultOpen false prop is passed', async () => {
    render(<TestSideBar SideBarProps={{ defaultOpen: false }} />);

    const collapsedSvg: HTMLElement | null = screen.queryByTestId('collapsedSvg');
    const expandedSvg: HTMLElement | null = screen.queryByTestId('expandedSvg');

    expect(expandedSvg).not.toBeInTheDocument();
    expect(collapsedSvg).toBeInTheDocument();
  });
});
