import React, { useState, useEffect } from 'react'
import SelectCoupon from './form/SelectCoupon'
import FormControl from '@mui/material/FormControl'
import { ButtonSendSMS } from '../../utils/form/button'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  TextHeader,
  TextSm,
} from '../../utils/form/text'
import { useForm } from 'react-hook-form'


import { Input1 } from '../../utils/form/input'
import { API_URL } from '../../service/endpoint'
interface IFormInputs {
  campaign_num?: string
  mobile?: string
  formState?: { errors: string }
}
interface IValue {
  campaign_num: string
  mobile: string
}

export const SendSMSFormContainer = () => {
  useEffect(() => {
    var username = localStorage.getItem('username')
    if (!username) {
      router.push('login')
    }
  }, []);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>()

  const [defaultValues, setDefaultValues] = useState<IValue>({
    campaign_num: '',
    mobile: '',
  })

  const [categories, setCategories] = useState('')
  const [mobile, setMobile] = useState('')
  const router = useRouter()
  const onSubmit = (data: IFormInputs) => {
    // const dataUpmesh = { campaign_num: data.campaign_num, mobile: data.mobile }
    Swal.fire({
      title: 'คุณต้องการที่จะส่ง?',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post(API_URL + '/requestCoupon', data)
          .then(async (res) => {
            await Swal.fire('สำเร็จ!', 'ส่งคูปองเรียบร้อยแล้ว', 'success')
            router.reload()
          })
          .catch((error) => {
            console.log('error')
            Swal.fire('ผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง', 'error')
          })
      }
    })
  }

  return (
    <form
      className=" m-8 flex w-full flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextHeader>Send SMS</TextHeader>
      <>
        <TextSm>Coupon</TextSm>
        <SelectCoupon
          control={control}
          categories={categories}
          setCategories={setCategories}
        />
      </>
      <Input1
        value={mobile}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
          setMobile(e.target.value)
        }}
      ></Input1>
      <ButtonSendSMS data={{ campaign_num: categories, mobile: mobile }}>
        sent
      </ButtonSendSMS>
    </form>
  )
}
