import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComplains } from '../getters/complain.getters';
import { fetchComplains } from '../thunks/complain.thunks'

export const useComplains = ({ page = 1, limit = 20 } = {}) => {
  const dispatch = useDispatch()
  const complains = useSelector(getComplains);

  const pagination = { page, limit }

  useEffect(() => {
    dispatch(fetchComplains({ pagination }))
  }, [])

  useEffect(() => {
    dispatch(fetchComplains({ pagination }))
  }, [page, limit])

  return complains;
}