import useAuth from '../hooks/useAuth';
import { auth } from '../storage/firebase';
import { Navigate } from 'react-router-dom';

type RequireAuthProps = { children?: React.ReactNode };

const RequireAuth = (props: RequireAuthProps) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (user && props.children) return props.children as React.ReactElement;

  return null;
};
export default RequireAuth;
