import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, onAuthStateChanged } from 'Firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({ user: authUser, loading, authenticated: authUser !== null }),
    [authUser, loading]
  );

  return <AuthContext.Provider value={value}>{children(authUser)}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
