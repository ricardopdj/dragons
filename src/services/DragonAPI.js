import { create } from 'apisauce'

const DragonAPI = create({
  baseURL: 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon'
})

DragonAPI.addResponseTransform(response => {
  if (!response.ok) throw response;
})

export default DragonAPI
;