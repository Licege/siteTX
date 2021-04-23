import React from 'react'
import { FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'

interface IProps {
    label: string
}

const renderCheckbox: React.FC<any> = ({ input, label }) => (
    <div>
        <FormControlLabel control={
            <Checkbox
                checked={!!input.value}
                onChange={input.onChange}
            />
        } label={label}/>
    </div>
)

export default renderCheckbox

