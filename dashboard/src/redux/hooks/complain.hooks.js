import {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getComplains, getTotalComplains} from '../getters/complain.getters';
import {fetchComplains} from '../thunks/complain.thunks'

export const useComplains = ({page = 1, limit = 20} = {}) => {
  const dispatch = useDispatch()
  const complains = useSelector(getComplains);
  const total = useSelector(getTotalComplains);

  const pagination = {page, limit}

  useEffect(() => {
    dispatch(fetchComplains({pagination}))
  }, [page, limit])

  const getComplainsFromServer = useCallback(({page, limit}) => {
    const pagination = {page, limit}
    dispatch(fetchComplains({pagination}))
  }, [])

  return {complains, total, getComplains: getComplainsFromServer};
}