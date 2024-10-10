import React from 'react'
import {
  Layout,
  LoginContainer,
  LoginFormContainer,
} from '../src/components/login'

const login = () => {
  return (
    <Layout>
      <LoginContainer>
        <LoginFormContainer />
      </LoginContainer>
    </Layout>
  )
}

export default login
