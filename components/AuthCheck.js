import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Redirect from './Redirect';

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username ? props.children : props.fallback || <Redirect to="/enter" />;
}
