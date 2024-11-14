import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { token, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/home');
    }
  }, [token]);

  if (!username) {
    return <h1>You don&lsquo;t have access</h1>;
  }

  return children;
};

export default ProtectedLayout;