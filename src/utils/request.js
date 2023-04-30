import axios from "axios"

// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:8000',
    crossdomain: true,
    timeout: 50000
})

// response interceptor
service.interceptors.response.use(

)

export default service
