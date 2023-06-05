import React from 'react'
import { redirect } from 'react-router-dom'
import getLoginDetails from './getLoginDetails'

export interface DecodedType {
  id: string
  role: string
}

// eslint-disable-next-line react/display-name
const withAuth = (Children: React.ComponentType<any>, role: string) => (props: any) => {
  const decoded = getLoginDetails() as DecodedType | undefined

  if ((decoded != null) && decoded.role === role) {
    if (role === 'student') {
      return React.createElement(Children, { ...props })
    } else if (role === 'admin') {
      return React.createElement(Children, { ...props })
    }
  }

  return redirect('/')
}

export default withAuth
