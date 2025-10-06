"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, getUserProgress, UserProgress } from './firestore';

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserProgress: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProgress: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshUserProgress: async () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserProgress(userId: string) {
    const progress = await getUserProgress(userId);
    setUserProgress(progress);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserProgress(user.uid);
      } else {
        setUserProgress(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, displayName: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar perfil con nombre
    await updateProfile(credential.user, { displayName });
    
    // Crear perfil en Firestore
    await createUserProfile(
      credential.user.uid,
      email,
      displayName
    );
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Crear/actualizar perfil en Firestore
    await createUserProfile(
      result.user.uid,
      result.user.email!,
      result.user.displayName || 'Usuario',
      result.user.photoURL || undefined
    );
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  async function refreshUserProgress() {
    if (user) {
      await loadUserProgress(user.uid);
    }
  }

  const value = {
    user,
    userProgress,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    refreshUserProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

