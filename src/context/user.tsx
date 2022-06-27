import { Box, CircularProgress } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../types'
// import useAuthApiRoutes from '../hooks/api/useAuthApiRoutes';
const UserContext = React.createContext<{
  user?: Partial<User>;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  saveUser: (user: Partial<User> | undefined, merge?: boolean) => void;
}>({
  user: undefined,
  isLoggedIn: false,
  setIsLoggedIn: () => undefined,
  saveUser: () => undefined,
});



export default UserContext;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<User> | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const { getAuthState } = useAuthApiRoutes();
  // must use useCallback becasue if saveUser is in a dependency array in another component it will keep re-rendereing!
  const saveUser = useCallback((user: Partial<User> | undefined) => {
    if (user) {
      // do not save sensitve info locally
      delete user.password;
      setUser((curUser) => {
        return { ...curUser, ...user };
      });
    } else {
      setUser(undefined);
    }

    setIsLoggedIn(user !== undefined);
  }, []);

  // useEffect(() => {
  //   getAuthState()
  //     .then((user) => {
  //       if (user) {
  //         saveUser(user);
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // }, [getAuthState, saveUser]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        saveUser,
      }}
    >
      {isLoading ? (
        <Box height="calc(100vh - 350px)" flex={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={100} />
        </Box>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
