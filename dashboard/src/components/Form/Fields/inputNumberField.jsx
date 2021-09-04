import { Field } from "react-final-form";
import {CustomNumberFormat} from "../styles";

const InputNumberComponent = ({ thousandSeparator = ",", allowNegative = false, showFormat, suffix, placeholder, input, ...props }) => {
  return (
    <CustomNumberFormat thousandSeparator={thousandSeparator}
                        allowNegative={allowNegative}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        onValueChange={({ floatValue }) => input.onChange(floatValue)}
                        isNumericString={true}
                        format={showFormat}
                        suffix={suffix}
                        placeholder={placeholder}
    />
  )
}

const InputNumberField = ({ name, ...props }) => <Field name={name} {...props} component={InputNumberComponent} />

export default InputNumberField
