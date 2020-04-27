import axios from 'axios'
const baseUrl = '/api/tips'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const getByTitle = async title => {
  const response = await axios.get(`${baseUrl}/title/${title}`)
  return response
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
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

const update = async (id, tip) => {
  console.log(tip)

  const response = await axios.put(`${baseUrl}/${id}`, tip)
  return response
}

const read = async id => {
  const response = await axios.post(`${baseUrl}/${id}/read`)
  return response
}

export default { getAll, getByTitle, create, remove, read, getById, update }
