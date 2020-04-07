import React from 'react'
import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

interface IProps {
    input: {
        value: any
        onChange: any
    }
    label: string
}

const renderCheckbox: React.FC<IProps> = ({ input, label }) => (
    <div>
        <FormControlLabel control={
            <Checkbox
                checked={!!input.value}
                onChange={input.onChange}
            />
        } label={label} />
    </div>
)

export default renderCheckbox;

