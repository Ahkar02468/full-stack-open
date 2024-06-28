import axios from 'axios'
const baseUrl = '/api/blogs'

let token
const config = () => ({
  headers: {
    Authorization: token,
  },
})

const setToken = (rawToken) => {
  token = `Bearer ${rawToken}`
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response.status
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { getAll, setToken, create, update, deleteBlog }