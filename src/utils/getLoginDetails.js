import { getCookie } from 'react-use-cookie'
import jwtDecode from 'jwt-decode'

const getLoginDetails = () => {
  const token = getCookie('token')

  try {
    const decoded = jwtDecode(token, 'takeaguess')
    return decoded
  } catch (err) {
    return {}
  }
}

export default getLoginDetails
