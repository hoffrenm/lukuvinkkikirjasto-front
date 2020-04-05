import axios from 'axios'
const baseUrl = '/api/tips'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response
}

export default { getAll, create }
