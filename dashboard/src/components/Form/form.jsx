import React from 'react'
import {Form} from 'react-final-form'

// const COMPONENT_TYPES = {
//   input: InputField
// }
//
// function isDefineComponentType(componentType) {
//   return Object.keys(COMPONENT_TYPES).includes(componentType);
// }
//
// const RenderFields = fields => {
//   return fields.map(field => {
//     if (!isDefineComponentType(field.component)) {
//       throw new Error(`Field with component type ${field.component} is not define`)
//     }
//
//     return COMPONENT_TYPES[field.component](field)
//   })
// }

const CustomForm = ({onSubmit, validate = () => {}, children}) => (
  <Form onSubmit={onSubmit}
        validate={validate}
        render={({
                   handleSubmit,
                   pristine,
                   submitting
        }) => (
          <form onSubmit={handleSubmit}>
            {children}
          </form>
        )}/>
)

export default CustomForm