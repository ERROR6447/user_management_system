import axiosInstance from '../config/axiosInstance'

const verifyToken = async (payload) => {
  axiosInstance(`/verify-email/${payload}`, {
    method: 'GET'
  }).then((resp) => resp)
}

export default verifyToken
