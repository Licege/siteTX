import {useState, useCallback} from 'react';
import {useComplains} from '../../redux/hooks/complain.hooks';
import {tableConfig} from './config';

export const useFeedbackLogic = () => {
  const {complains, total, getComplains} = useComplains()
  const [perPage, setPerPage] = useState(tableConfig.options.paginationPerPage || 10)

  const handlePageChange = useCallback(page => {
    getComplains({page, limit: perPage})
  }, [perPage])

  const handleChangePerPage = useCallback((newPerPage, page) => {
    getComplains({page, limit: newPerPage})
    setPerPage(newPerPage)
  }, [])

  const handleSort = useCallback((column, direction) => {
  }, [])

  return {complains, total, handlePageChange, handleChangePerPage, handleSort}
}
