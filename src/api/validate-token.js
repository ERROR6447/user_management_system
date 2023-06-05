import axiosInstance from '../config/axiosInstance'

const validateToken = async (payload) => {
  axiosInstance(`/validate?token=${payload}`, {
    method: 'GET'
  })
    .then((resp) => resp)
    .catch((err) => {
      console.log(err)
    })
}

export default validateToken
