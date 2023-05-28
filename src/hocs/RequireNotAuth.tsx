import { PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireNotAuth: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to="/main" />;
  }

  if (children) return children as ReactElement;

  return null;
};

export { RequireNotAuth };
