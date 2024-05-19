import React, { useCallback, useEffect, useState } from 'react';
import BlockingDialog from '../components/BlockingDialog';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { Colors } from '../constants/Colors';
import Button, { ButtonProps } from '@mui/material/Button';
import { PaperProps } from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export const ConfirmationServiceContext = React.createContext<{
  showBockingModal: (id: string) => Promise<void>;
  showConfirmationModal: (confirmationOptions: ConfirmationOptions) => Promise<{ confirmed: boolean } | void>;
  openId: string | undefined;
  setOpenId: (id: string | undefined) => void;
}>({
  showConfirmationModal: Promise.reject,
  showBockingModal: Promise.reject,
  openId: undefined,
  setOpenId: () => undefined,
});

export type ConfirmationOptions = {
  DialogPaperProps?: PaperProps;
  title: string;
  contentText: string;
  hideOk?: boolean;
  continueText?: React.ReactNode;
  continueButtonProps?: ButtonProps;
  cancelText?: React.ReactNode;
  cancelButtonProps?: ButtonProps;
  titleProps?: TypographyProps;
  contentProps?: TypographyProps;
  actionsSx?: SxProps<Theme>;
};
export const ConfirmationServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState<string | undefined>(undefined);
  const [confirmationOptions, setConfirmationOptions] = useState<ConfirmationOptions>({
    title: '',
    contentText: '',
  });
  const awaitingPromiseRef = React.useRef<{
    resolve: (payload?: any) => void; // eslint-disable-line
    reject: () => void;
  }>();

  useEffect(() => {
    if (openId === undefined && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }
  }, [openId]);

  const showBockingModal = useCallback((id: string) => {
    setOpenId(id);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  }, []);

  const showConfirmationModal = useCallback((_confirmationOptions: ConfirmationOptions) => {
    setConfirmationOptions(_confirmationOptions);
    setOpenId('confirmation-modal');
    return new Promise<{ confirmed: boolean } | void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve({ confirmed: true });
    }
  }, []);

  const handleCancel = useCallback(() => {
    setOpenId(undefined);
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve({ confirmed: false });
    }
  }, []);

  return (
    <ConfirmationServiceContext.Provider value={{ showBockingModal, openId, setOpenId, showConfirmationModal }}>
      {children}
      <ConfirmationModal confirmationOptions={confirmationOptions} onConfirm={handleConfirm} onCancel={handleCancel} />
    </ConfirmationServiceContext.Provider>
  );
};

const ConfirmationModal = ({
  confirmationOptions: {
    DialogPaperProps,
    title,
    titleProps,
    contentText,
    contentProps,
    hideOk,
    continueText = 'Continue',
    continueButtonProps,
    cancelText = 'Cancel',
    cancelButtonProps,
    actionsSx,
  },
  onConfirm,
  onCancel,
}: {
  confirmationOptions: ConfirmationOptions;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <BlockingDialog id="confirmation-modal" PaperProps={DialogPaperProps}>
      <DialogTitle sx={{ color: Colors.greyscale.offBlack }} {...titleProps}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          align="center"
          variant="subtitle1"
          color="textSecondary"
          sx={{ whiteSpace: 'pre-line' }}
          {...contentProps}
        >
          {contentText}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, mb: 2, justifyContent: 'flex-start', ...actionsSx }}>
        {hideOk ? null : (
          <Button variant="contained" color="primary" autoFocus onClick={onConfirm} {...continueButtonProps}>
            {continueText}
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={onCancel} {...cancelButtonProps}>
          {cancelText}
        </Button>
      </DialogActions>
    </BlockingDialog>
  );
};
