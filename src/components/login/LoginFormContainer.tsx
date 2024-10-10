import { ButtonSignIn } from '../../utils/form/button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import {
  TextError,
  TextHeader,
  TextNeedAnAccount,
  TextSm,
} from '../../utils/form/text'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Username } from './form/Username'
import { Password } from './form/Password'
import { API_URL } from '../../service/endpoint'

interface IFormInputs {
  username?: string
  password?: string
  formState?: { errors: string }
}

interface IValue {
  username: string
  password: string
}

export const LoginFormContainer = () => {
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<IFormInputs>()
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<IValue>({
    username: '',
    password: '',
  })

  const onSubmit = async (data: IFormInputs) => {
    await axios
      .post(API_URL + '/login', data)
      .then((res) => {
        localStorage.setItem('username', JSON.stringify(data.username))
        router.push('/sendSMS')
      })
      .catch((error) => {
        Swal.fire('ผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง', 'error')
      })
  }

  return (
    <form
      className=" m-8 flex w-full flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextHeader>Upmesh</TextHeader>
      <TextSm>user</TextSm>
      <Username control={control} />
      {errors.username && <TextError>{errors.username.message}</TextError>}
      <TextSm>password</TextSm>
      <Password control={control} />
      {errors.password && <TextError>{errors.password.message}</TextError>}

      <ButtonSignIn data={defaultValues}>login</ButtonSignIn>
    </form>
  )
}
