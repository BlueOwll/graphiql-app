import { useContext } from 'react';
import { AuthContext } from '../hocs/AuthProvider';

export default function useAuth() {
  return useContext(AuthContext);
}
