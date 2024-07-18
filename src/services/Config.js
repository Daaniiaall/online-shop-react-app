import axios from "axios";

const api = axios.create({baseURL:"https://fakestoreapi.com"})

api.interceptors.response.use(
    function(response){
        // console.log(response.data);
        return response.data;
    } 
    , 
    function(error){
        // console.log(error);
        return Promise.reject(error);
    }
)

export default api ;