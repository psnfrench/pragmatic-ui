import { useCallback, useEffect, useRef } from 'react';

export function useOnTabClose(onTabClose: () => void) {
  /**
   * Accepts a fucntion to run on tab close.
   * Returns a function that sets a boolean flag used to determine if the function should be
   * run (defaults to true).
   *
   * I.e. you can toggle on/off the whether the function should run based on some other criterea
   * at a later time. Example Use:
   *
   * const setRunOnTabClose = useOnTabClose(() => signOut())
   * setRunOnTabClose(false)
   */

  const runOnTabClose = useRef(true);
  const setRunOnTabClose = useCallback((newValue: boolean) => {
    runOnTabClose.current = newValue;
  }, []);

  useEffect(() => {
    const handleTabClosing = (ev: Event) => {
      onTabClose();
      ev.preventDefault();
    };
    if (runOnTabClose.current) {
      window.addEventListener('unload', handleTabClosing);
    }
    return () => {
      if (runOnTabClose.current) {
        window.removeEventListener('unload', handleTabClosing);
      }
    };
  }, [onTabClose]);

  return setRunOnTabClose;
}
