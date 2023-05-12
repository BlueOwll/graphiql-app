import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@firebase/auth';
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../storage/firebase';

type SigninFunction = (login: string, password: string) => Promise<void>;
type SignoutFunction = () => void;

interface AuthProviderValue {
  user: User | null;
  signin: SigninFunction;
  signup: SigninFunction;
  signout: SignoutFunction;
  error?: Error;
  loading: boolean;
}
type AuthProviderProps = {
  children?: React.ReactNode;
};

const signin: SigninFunction = async (email, password) => {
  try {
    console.log(`dm ${email} ps ${password}`);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(`Auth error ${(e as Error).message}`);
  }
};

const signup: SigninFunction = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(`Auth error ${(e as Error).message}`);
  }
};

const signout: SignoutFunction = async () => {
  try {
    await signOut(auth);
  } catch {
    // already unauthorized
  }
};

export const AuthContext = createContext<AuthProviderValue>({
  user: null,
  signin,
  signup,
  signout,
  loading: false,
});

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  // console.log('provider');
  // console.log(user);

  const value = {
    user,
    loading,
    error,
    signin,
    signup,
    signout,
  } as AuthProviderValue;
  console.log(value);
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
