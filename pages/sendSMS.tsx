import React from 'react'
import {
  Layout,
  SendSMSContainer,
  SendSMSFormContainer,
} from '../src/components/sendSMS'

const sendSMS = () => {
  return (
    <Layout>
      <SendSMSContainer>
        <SendSMSFormContainer />
      </SendSMSContainer>
    </Layout>
  )
}

export default sendSMS
