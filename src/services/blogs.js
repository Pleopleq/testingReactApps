import axios from 'axios'
const baseUrl = '/api/blogs' 

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  const response = await request
  return response.data
}

const deleteBlog = async id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { 
  getAll,
  setToken,
  create, 
  update, 
  deleteBlog
 }