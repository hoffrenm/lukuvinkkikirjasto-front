import axios from 'axios'
const baseUrl = '/api'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/tips`)
  return response
}

const getAllUnread = async () => {
  const response = await axios.get(`${baseUrl}/tips/unread`)
  return response
}

const getByTitle = async title => {
  const response = await axios.get(`${baseUrl}/tips/title/${title}`)
  return response
}

const getByTag = async tag => {
  console.log(`${baseUrl}/tags/${tag}`)
  const response = await axios.get(`${baseUrl}/tags/${tag}`)
  return response
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/tips/${id}`)
  return response
}

const create = async newObject => {
  const response = await axios.post(`${baseUrl}/tips`, newObject)
  return response
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/tips/${id}`)
  return response
}

const update = async (id, tip) => {
  const response = await axios.put(`${baseUrl}/tips/${id}`, tip)
  return response
}

const read = async id => {
  const response = await axios.post(`${baseUrl}/tips/${id}/read`)
  return response
}

export default { getAll, getAllUnread, getByTitle, getByTag, getById, create, remove, update, read }
