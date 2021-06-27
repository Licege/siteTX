import React from 'react'
import { FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'


const renderCheckbox = ({ input, label }: any) => (
  <div>
    <FormControlLabel control={
      <Checkbox checked={input.checked}
                onChange={input.onChange}/>
      } label={label}/>
  </div>
)

export default renderCheckbox

