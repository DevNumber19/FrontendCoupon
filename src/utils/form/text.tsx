import { GoogleOutlined } from '@ant-design/icons'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React from 'react'

export const TextSm = ({ children, ...props }: any) => {
  return (
    <p
      className="m-1 text-xs font-bold text-gray-500 dark:text-gray-400"
      {...props}
    >
      {children}
    </p>
  )
}

export const TextHeader = ({ children, ...props }: any) => {
  return (
    <p className="mx-auto  text-xl text-gray-600 dark:text-gray-200" {...props}>
      {children}
    </p>
  )
}

export const TextNeedAnAccount = ({ ...props }: any) => {
  const router = useRouter()
  return (
    <p
      className="m-1 cursor-pointer text-xs text-slate-700 dark:text-gray-400"
      onClick={() => {
        router.push('/register')
      }}
    >
      need an account?
    </p>
  )
}

export const TextError = ({ children, ...props }: any) => {
  return (
    <p
      className="m-1 text-xs font-bold text-red-600 dark:text-red-400"
      {...props}
    >
      {children}
    </p>
  )
}

export const TextSmLight = ({ children, ...props }: any) => {
  return (
    <p
      className="m-1 w-full text-left text-xs text-gray-500 dark:text-gray-400"
      {...props}
    >
      {children}
    </p>
  )
}

// export const TextGoogleLogin = ({ ...props }: any) => {
//   const router = useRouter()
//   const { theme, setTheme } = useTheme()
//   const loginWithGoogle = () => {
//     signInWithPopup(auth, provider)
//       .then(() => {
//         router.push('/chat')
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }
//   return (
//     <div
//       className=" mt-2 flex cursor-pointer items-center justify-center gap-1 p-1"
//       onClick={() => loginWithGoogle()}
//       {...props}
//     >
//       <GoogleOutlined
//         style={
//           theme === 'dark' ? { fontSize: 16, color: 'gray' } : { fontSize: 16 }
//         }
//       />
//       <p className="mr-1 h-1 text-xs text-slate-900   dark:text-gray-400">
//         continue with google
//       </p>
//     </div>
//   )
// }
