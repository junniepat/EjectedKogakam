import axios from 'axios';
import {AsyncStorage} from "react-native";


axios.defaults.headers.common['sesson_token'] = AsyncStorage.getItem('token');
axios.defaults.headers.common['app_key'] = 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag=';
axios.defaults.baseURL = 'https://kogakam.com/api/v1/';


export async function register(data){
    try{
        let res = await axios.post('/register', data, {
            headers: {
              app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
            }
          });

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(data){
    try{
        let res = await axios.post('/login', data, {
            headers: {
              app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
            }
          } );
        return res.data.successData;
    }catch (e) {
        throw handler(e);
    }
}

// export async function userProfile(data){
//     try{
//         let res = await axios.post('/login', data, {
//             headers: {
//               app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
//             }
//           } );
//         return res.data.successData;
//     }catch (e) {
//         throw handler(e);
//     }
// }


export async function profile(data){
    try{
        let res = await axios.post(c.PROFILE, data, headers );
        return res.data.successData;
    }catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateProfile(userId, data){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        for ( let key in data )
            form_data.append(key, data[key]);

        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("errorMessage"))
        error = err.response.data;
    else if (!err.hasOwnProperty("errorMessage")) error = err.toJSON();

    return new Error(error.errorMessage);
}