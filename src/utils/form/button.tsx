import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
type Props = {
  children: any
  data: { campaign_num: string; mobile: string }
}
type PropsSignIn = {
  children: any
  data: { username: string; password: string }
}
import { API_URL } from '../../service/endpoint'
export const ButtonSendSMS = ({ children, data }: Props) => {
  // const auth = getAuth()

  const router = useRouter()

  const handleSendSMS = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let username
    const rawUsername = localStorage.getItem('username')
    if (rawUsername) {
      username = JSON.parse(rawUsername)
    }
    const dataUpmesh = {
      campaign_num: data.campaign_num,
      mobile: data.mobile,
      username: username,
    }

    if (
      data.mobile[0] != '0' ||
      data.mobile.length != 10 ||
      data.campaign_num == ''
    ) {
      Swal.fire('ผิดพลาด!', 'ข้อมูลไม่ถูกต้อง', 'error')
    } else {
      Swal.fire({
        title: `Confirm send ${data.campaign_num} to ${data.mobile}?`,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .post(API_URL + '/requestCoupon', dataUpmesh)
            .then((res) => {
              Swal.fire('สำเร็จ!', 'กรุณาตรวจสอบ SMS ของท่าน', 'success').then(
                (res) => {
                  router.reload() // fill
                }
              )
            })
            .catch((error) => {
              let errorData = error.response.data.system_response
              if (errorData) {
                return Swal.fire('ผิดพลาด!', errorData.message, 'error')
              }
              return Swal.fire('ผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง', 'error')
            })
        } else if (result.isDenied) {
        }
      })
    }
  }

  return (
    <button
      className="m-4 mx-auto flex h-6 w-36 items-center justify-center bg-indigo-500 py-2 text-sm font-semibold text-gray-200"
      onClick={(e) => {
        handleSendSMS(e)
      }}
    >
      {children}
    </button>
  )
}
export const ButtonSignIn = ({ children, data }: PropsSignIn) => {
  return (
    <button className="m-4 mx-auto flex h-6 w-36 items-center justify-center bg-indigo-500 py-2 text-sm font-semibold text-gray-200">
      {children}
    </button>
  )
}
