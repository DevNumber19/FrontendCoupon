import { Controller, Control } from 'react-hook-form'
import { Input1 } from '../../../utils/form/input'

export const Mobile = ({ control }: { control: Control }) => {
  return (
    <Controller
      render={({ field }) => (
        <Input1 {...field} type="text" innerRef={field.ref} />
      )}
      name="Mobile"
      control={control}
      rules={{
        required: 'number required..',
        minLength: {
          value: 10,
          message: 'number must be at least 5 characters',
        },
        maxLength: {
          value: 50,
          message: 'number has 50 characters limit',
        },
        // pattern: {
        //   value:
        //     /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        //   message: 'please fill number correctly',
        // },
      }}
    />
  )
}
