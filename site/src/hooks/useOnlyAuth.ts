import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuthStatus } from '../redux/selectors/auth';

const DEFAULT_PAGE = '/';
export const useOnlyAuth = () => {
  const history = useHistory();
  const isAuthenticated = useSelector(getAuthStatus);

  if (!isAuthenticated) {
    history.push(DEFAULT_PAGE)
  }
}