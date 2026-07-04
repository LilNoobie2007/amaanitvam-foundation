import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import api from '../config/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const res = await api.get('/admin/me');
          setUserProfile(res.data.user);
        } catch (err) {
          console.error('Failed to fetch admin profile:', err);
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error('Email is required.');
    }

    return signInWithEmailAndPassword(auth, normalizedEmail, password);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error('Email is required.');
    }

    return sendPasswordResetEmail(auth, normalizedEmail);
  };

  const value = {
    user,
    userProfile,
    setUserProfile,
    loading,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
