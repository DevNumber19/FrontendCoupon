import { Controller, Control } from 'react-hook-form'
import { Input1 } from '../../../utils/form/input'

export const Username = ({ control }: { control: Control }) => {
  return (
    <Controller
      render={({ field }) => (
        <Input1 {...field} type="text" innerRef={field.ref} />
      )}
      name="username"
      control={control}
      rules={{
        required: 'username required..',
        minLength: {
          value: 5,
          message: 'username must be at least 5 characters',
        },
        maxLength: {
          value: 50,
          message: 'username has 50 characters limit',
        },
        // pattern: {
        //   value:
        //     /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        //   message: 'please fill username correctly',
        // },
      }}
    />
  )
}
