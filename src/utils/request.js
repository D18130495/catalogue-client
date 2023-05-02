import axios from "axios"
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:8080',
    crossdomain: true,
    timeout: 50000
})

// response interceptor
service.interceptors.response.use(
    response => {
        if(response.status === 200) {
            if(response.data.status !== 200) {
                Message.error({
                    message: response.data.message,
                    showClose: true,
                    duration: 1500
                });

                return Promise.reject(response);
            }else {
                return Promise.resolve(response);
            }
        }else {
            Message.error({
                message: "Request not successful",
                showClose: true,
                duration: 1500
            });

            return Promise.reject(response);
        }
    },
    error => {
        Message.error({
            message: "Oops! Something goes wrong",
            showClose: true,
            duration: 1500
        });

        return Promise.reject(error.response);
    }

)

export default service
