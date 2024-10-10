import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = ({ loading }) => {
  return (
    <div
      className={`${
        loading ? 'visible' : 'invisible'
      } fixed z-50 m-auto flex h-screen w-screen items-center justify-center bg-slate-900 opacity-30`}
    >
      <ReactLoading type="spin" color="#4338ca" height={'10%'} width={'10%'} />
    </div>
  )
}

export const LoadingChatName = ({ loading }) => {
  return (
    <div
      className={`${
        loading ? 'visible' : 'invisible'
      } z-49 absolute m-auto flex h-full w-full items-center justify-center bg-slate-900 bg-opacity-0 `}
    >
      <ReactLoading
        type="spin"
        color="#4338ca"
        height={'10%'}
        width={'10%'}
        className="bg-opacity-100"
      />
    </div>
  )
}
