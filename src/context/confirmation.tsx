import React, { useCallback, useEffect, useState } from 'react';
import BlockingDialog from '../components/BlockingDialog';
import { Button, DialogActions, DialogContent, DialogTitle, Theme, Typography } from '@mui/material';
import { Colors } from '../constants/Colors';

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

type ConfirmationOptions = {
  title: string;
  contentText: string;
  hideOk?: boolean;
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

  return (
    <ConfirmationServiceContext.Provider value={{ showBockingModal, openId, setOpenId, showConfirmationModal }}>
      {children}
      <ConfirmationModal
        confirmationOptions={confirmationOptions}
        onConfirm={handleConfirm}
        onCancel={() => setOpenId(undefined)}
      />
    </ConfirmationServiceContext.Provider>
  );
};

const ConfirmationModal = ({
  confirmationOptions,
  onConfirm,
  onCancel,
}: {
  confirmationOptions: ConfirmationOptions;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <BlockingDialog id="confirmation-modal">
      <DialogTitle
        sx={{
          color: Colors.greyscale.offBlack,
        }}
      >
        {confirmationOptions.title}
      </DialogTitle>
      <DialogContent>
        <Typography align="center" variant="subtitle1" color="textSecondary" sx={{ whiteSpace: 'pre-line' }}>
          {confirmationOptions.contentText}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, mb: 2, justifyContent: 'flex-start' }}>
        {confirmationOptions.hideOk ? null : (
          <Button variant="contained" color="primary" autoFocus onClick={onConfirm}>
            Continue
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </BlockingDialog>
  );
};
