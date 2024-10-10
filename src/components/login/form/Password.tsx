import { Controller, Control } from 'react-hook-form'
import { Input1 } from '../../../utils/form/input'

export const Password = ({ control }: { control: Control }) => {
  return (
    <Controller
      render={({ field }) => (
        <Input1 {...field} type="password" innerRef={field.ref} />
      )}
      name="password"
      control={control}
      rules={{
        required: 'password required..',
        minLength: {
          value: 4,
          message: 'password must be at least 4 characters',
        },
        maxLength: {
          value: 20,
          message: 'password has 20 characters limit',
        },
        pattern: {
          value: /\S*(\S*([a-zA-Z]\S*[0-9])|([0-9]\S*[a-zA-Z]))\S*/,
          message: 'password only contain characters and numbers',
        },
      }}
    />
  )
}
