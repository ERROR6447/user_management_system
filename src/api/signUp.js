import axiosInstance from '../config/axiosInstance'

const signUp = async (payload) => {
  axiosInstance('/signup', {
    method: 'POST',
    data: payload
  }).then((resp) => resp)
}

export default signUp
