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

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

export default { getAll, create, remove }
