import {logout} from '../reducers/auth.reducer';

export const authInterceptor = ({dispatch}) => next => action => {
  if (action.payload?.status === 401) {
    dispatch(logout());
  } else {
    next(action);
  }
};