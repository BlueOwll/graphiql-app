import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@firebase/auth';
import { createContext, PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../storage/firebase';

type SigninFunction = (login: string, password: string) => Promise<void>;
type SignoutFunction = () => void;

interface AuthProviderValue {
  user: User | null;
  signin: SigninFunction;
  signup: SigninFunction;
  signout: SignoutFunction;
}
type AuthProviderProps = {
  children?: React.ReactNode;
};

const signin: SigninFunction = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(`Auth error ${(e as Error).message}`);
  }
};

const signup: SigninFunction = async (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password);
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
});

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  // console.log('provider');
  // console.log(user);

  const value = {
    user,
  } as AuthProviderValue;
  return (
    <AuthContext.Provider value={value}>
      {loading && <div>Loading auth..</div>}
      {!loading && !!props.children && props.children}
      {!!error && <div>Error {error.message}</div>}
    </AuthContext.Provider>
  );
};
