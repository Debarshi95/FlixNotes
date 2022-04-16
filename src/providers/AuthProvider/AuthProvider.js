import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, onAuthStateChanged } from 'Firebase';
import NoteProvider from 'providers/NoteProvider/NoteProvider';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  const value = useMemo(() => ({ user: authUser, authenticated: authUser !== null }), [authUser]);

  return (
    <AuthContext.Provider value={value}>
      <NoteProvider user={authUser}>{children}</NoteProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
