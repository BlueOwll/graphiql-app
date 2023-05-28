import { PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth();

  //console.log(`require ${user}`);
  if (loading) return null;

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  if (children) return children as ReactElement;

  return null;
};

export { RequireAuth };
