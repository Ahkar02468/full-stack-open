import axios from 'axios'
const baseUrl = '/api/blogs'

let token;
const config = () => ({
  headers: {
    Authorization: token,
  },
});

const setToken = (rawToken) => {
  token = `Bearer ${rawToken}`;
};

const create = async (newObject) => {
  // console.log('newObject: ', newObject)
  // console.log('token: ', token)

  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { getAll, setToken, create }