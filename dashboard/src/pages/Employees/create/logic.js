import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {prepareOptions} from '../../../components/Form';
import {useFileLogic} from '../../../hooks';
import {createNewEmployee} from '../../../redux/thunks/employees.thunks';
import {useStaffPositions} from '../../../redux/hooks/staffPositions.hooks';

export function useCreateEmployeePageLogic() {
  const history = useHistory()
  const dispatch = useDispatch()
  const positions = useStaffPositions();

  const {file, uploadFile, createFormDataWithFile} = useFileLogic()

  const positionOptions = prepareOptions(positions, {value: 'id', name: 'name', withEmpty: true})

  const cancel = useCallback(() => history.push('/employees'), [])

  const create = useCallback(data => {
    const formData = createFormDataWithFile(data, 'image')

    formData.set('positionId', data.positionId.value)

    dispatch(createNewEmployee(formData))
    history.push('/employees')
  }, [file]);

  return {positions: positionOptions, cancel, create, uploadFile}
}