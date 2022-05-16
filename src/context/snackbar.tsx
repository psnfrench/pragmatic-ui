import React, { useCallback, useState } from 'react';
import { AlertColor } from '@mui/material/Alert';
import { SnackbarProps } from '@mui/material/Snackbar';
import SimpleSnackbar from '../components/SimpleSnackbar';

const SnackBarContext = React.createContext<{
  showSnack: (message: string, severity: AlertColor, options?: SnackbarProps) => void;
}>({
  showSnack: () => undefined,
});
export default SnackBarContext;

export const SnackBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState<{ severity: AlertColor } & SnackbarProps>({
    severity: 'success',
    message: '',
  });

  const showSnack = useCallback((message: string | any, severity: AlertColor, options: SnackbarProps = {}) => {
    let textMessage = '';
    if (typeof message === 'string') {
      textMessage = message;
    } else if (message.message) {
      textMessage = message.message.toString();
    } else {
      textMessage = JSON.stringify(message);
    }

    setSnackStatus({ message: textMessage, severity: severity, ...options });
    setSnackOpen(true);
  }, []);

  return (
    <SnackBarContext.Provider value={{ showSnack }}>
      <SimpleSnackbar open={snackOpen} setOpen={setSnackOpen} {...snackStatus} />
      {children}
    </SnackBarContext.Provider>
  );
};
