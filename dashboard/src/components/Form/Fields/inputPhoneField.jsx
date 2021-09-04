import { Field } from "react-final-form";
import { CustomNumberFormat } from "../styles";

const InputPhoneComponent = ({ allowNegative = false, placeholder, input }) => {
  return (
    <CustomNumberFormat allowNegative={allowNegative}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        onValueChange={({floatValue}) => input.onChange(floatValue)}
                        format="+7 ### ### ## ##"
                        placeholder={placeholder}
    />
  )
}

const InputPhoneField = ({ name, ...props }) => <Field name={name} {...props} component={InputPhoneComponent} />

export default InputPhoneField
