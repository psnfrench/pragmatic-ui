import { Dialog, DialogProps } from '@mui/material';
import React, { useContext } from 'react';
import { ConfirmationServiceContext } from '../context/confirmation';

type Props = DialogProps & {
  id: string; // unique id to identify for open/closing
};
/**
 * To use this Component you must use the ConfirmationServiceContext and call `showBockingModal('my-id')`
 * where my-id is the id prop. This ensures only a single modal is called as a time
 *
 * showBockingModal('my-id') will retun a promis that resolves when the moal is closed. THis is very useful when
 * you wnat to wait for the response from a modal before proceeding e.g.
 *
 * await showBockingModal('first-blocker')
 * await showBockingModal('second-blocker')
 *
 * Note: by omitting the 'open' prop as we control that through the openId on the ConfirmationServiceContext as
 * do not want to pass it down to the dialog component
 */
const BlockingDialog = (props: Omit<Props, 'open'>) => {
  const { id, onClose, ...otherProps } = props;
  const { openId, setOpenId } = useContext(ConfirmationServiceContext);

  const handleClose = (event: Event, reason: 'backdropClick' | 'escapeKeyDown') => {
    setOpenId(undefined);
    if (onClose) {
      onClose(event, reason);
    }
  };

  return <Dialog open={id === openId} onClose={handleClose} {...otherProps} />;
};

export default BlockingDialog;
