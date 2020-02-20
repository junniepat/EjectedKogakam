import axios from 'axios'


class Logic {
    constructor() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.defaults.baseURL = 'https://kogakam.com/api/v1/';
    }


    
    Register = (endpoint, data) => {
        return axios
            .post(endpoint, data)
            .then(res => {
                return res.data;
            })
    }

}

